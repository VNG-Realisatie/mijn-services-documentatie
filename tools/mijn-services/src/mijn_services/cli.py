from __future__ import annotations

import argparse
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml


@dataclass(frozen=True)
class ValidationIssue:
    path: Path
    message: str


def repo_root() -> Path:
    return Path(__file__).resolve().parents[4]


def load_yaml(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as file:
        return yaml.safe_load(file)


def as_list(value: Any) -> list[Any]:
    return value if isinstance(value, list) else []


def collect_operation_ids(openapi: dict[str, Any]) -> set[str]:
    operation_ids: set[str] = set()
    paths = openapi.get("paths") or {}
    if not isinstance(paths, dict):
        return operation_ids

    for path_item in paths.values():
        if not isinstance(path_item, dict):
            continue
        for operation in path_item.values():
            if isinstance(operation, dict) and "operationId" in operation:
                operation_ids.add(str(operation["operationId"]))

    return operation_ids


def source_by_name(arazzo: dict[str, Any]) -> dict[str, dict[str, Any]]:
    sources: dict[str, dict[str, Any]] = {}
    for source in as_list(arazzo.get("sourceDescriptions")):
        if isinstance(source, dict) and source.get("name"):
            sources[str(source["name"])] = source
    return sources


def resolve_source_url(arazzo_path: Path, source: dict[str, Any]) -> Path | None:
    url = source.get("url")
    if not isinstance(url, str):
        return None
    return (arazzo_path.parent / url).resolve()


def validate_arazzo(arazzo_path: Path) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []

    if not arazzo_path.exists():
        return [ValidationIssue(arazzo_path, "Arazzo file does not exist")]

    arazzo = load_yaml(arazzo_path)
    if not isinstance(arazzo, dict):
        return [ValidationIssue(arazzo_path, "Arazzo file must contain an object")]

    if str(arazzo.get("arazzo")) != "1.1.0":
        issues.append(ValidationIssue(arazzo_path, "Expected arazzo: 1.1.0"))

    sources = source_by_name(arazzo)
    for required_source in ["interactieservicesApi", "openvtbTakenApi"]:
        if required_source not in sources:
            issues.append(ValidationIssue(arazzo_path, f"Missing sourceDescription: {required_source}"))

    source_paths: dict[str, Path] = {}
    source_documents: dict[str, dict[str, Any]] = {}
    for name, source in sources.items():
        source_path = resolve_source_url(arazzo_path, source)
        if source_path is None:
            issues.append(ValidationIssue(arazzo_path, f"sourceDescription {name} has no usable url"))
            continue
        source_paths[name] = source_path
        if not source_path.exists():
            issues.append(ValidationIssue(arazzo_path, f"sourceDescription {name} points to missing file: {source.get('url')}"))
            continue
        loaded = load_yaml(source_path)
        if isinstance(loaded, dict):
            source_documents[name] = loaded
        else:
            issues.append(ValidationIssue(source_path, "Referenced source is not a YAML object"))

    openvtb_operation_ids = collect_operation_ids(source_documents.get("openvtbTakenApi", {}))
    interactie_operation_ids = collect_operation_ids(source_documents.get("interactieservicesApi", {}))

    for workflow in as_list(arazzo.get("workflows")):
        if not isinstance(workflow, dict):
            issues.append(ValidationIssue(arazzo_path, "Workflow entry must be an object"))
            continue

        workflow_id = workflow.get("workflowId", "<unknown>")

        target_operation_id = workflow.get("x-mijnservices-targetOperationId")
        if isinstance(target_operation_id, str):
            _, _, operation_id = target_operation_id.partition(".")
            if operation_id and operation_id not in interactie_operation_ids:
                issues.append(
                    ValidationIssue(
                        arazzo_path,
                        f"Workflow {workflow_id} references unknown target operationId: {target_operation_id}",
                    )
                )

        for step in as_list(workflow.get("steps")):
            if not isinstance(step, dict):
                issues.append(ValidationIssue(arazzo_path, f"Workflow {workflow_id} has a non-object step"))
                continue
            operation_id = step.get("operationId")
            if operation_id and operation_id not in openvtb_operation_ids:
                issues.append(
                    ValidationIssue(
                        arazzo_path,
                        f"Workflow {workflow_id} step {step.get('stepId', '<unknown>')} references unknown operationId: {operation_id}",
                    )
                )

    return issues


def default_arazzo_files(root: Path) -> list[Path]:
    return sorted(root.glob("docs/mijn-services/aansluitprofielen/**/arazzo.yaml"))


def run_redocly_lint(root: Path, files: list[Path]) -> int:
    relative_files = [str(file_path.relative_to(root)) for file_path in files]
    command = ["pnpm", "exec", "redocly", "lint", *relative_files]

    try:
        completed = subprocess.run(command, cwd=root, check=False)
    except FileNotFoundError:
        print("Redocly validation failed: pnpm is not available.", file=sys.stderr)
        return 1

    return completed.returncode


def run_validate(args: argparse.Namespace) -> int:
    root = repo_root()
    files = [Path(path).resolve() for path in args.files] if args.files else default_arazzo_files(root)

    if not files:
        print("No Arazzo files found.")
        return 0

    if not args.skip_redocly:
        redocly_exit_code = run_redocly_lint(root, files)
        if redocly_exit_code != 0:
            return redocly_exit_code

    issues: list[ValidationIssue] = []
    for file_path in files:
        issues.extend(validate_arazzo(file_path))

    if issues:
        for issue in issues:
            print(f"{issue.path.relative_to(root)}: {issue.message}", file=sys.stderr)
        print(f"Validation failed with {len(issues)} issue(s).", file=sys.stderr)
        return 1

    print(f"Validated {len(files)} Arazzo file(s).")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="mijn-services")
    subparsers = parser.add_subparsers(dest="command", required=True)

    validate_parser = subparsers.add_parser("validate", help="Validate MijnServices Arazzo profiles")
    validate_parser.add_argument("files", nargs="*", help="Specific Arazzo files to validate")
    validate_parser.add_argument("--skip-redocly", action="store_true", help="Skip Redocly Arazzo validation")
    validate_parser.set_defaults(func=run_validate)

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return int(args.func(args))


if __name__ == "__main__":
    raise SystemExit(main())

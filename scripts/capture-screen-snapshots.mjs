import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";
import YAML from "yaml";

const DEFAULT_PROFILE = "docs/mijn-services/kanalen/mijn-omgeving/schermprofielen/schermprofiel.yaml";

function readOption(name) {
  const prefix = `--${name}=`;
  const argument = process.argv.find((value) => value.startsWith(prefix));
  return argument ? argument.slice(prefix.length) : undefined;
}

function staticPathFromAsset(asset) {
  if (!asset?.startsWith("/img/")) {
    throw new Error(`Screenshot asset must start with /img/: ${asset}`);
  }
  return path.join(process.cwd(), "static", asset.slice(1));
}

function findRenderSource(screen, screenshot) {
  const sourceTitle = screenshot.source?.visualReference;
  const renderSources = screen.visualReferences?.filter(
    (reference) => reference.type === "storybook-iframe" && reference.role === "render-source",
  ) ?? [];

  if (sourceTitle) {
    const match = renderSources.find((reference) => reference.title === sourceTitle);
    if (match) {
      return match;
    }
  }

  if (renderSources.length === 1) {
    return renderSources[0];
  }

  throw new Error(`Unable to determine render-source for ${screen.screenId} / ${screenshot.scenario}`);
}

async function captureScreenshot(page, screen, screenshot) {
  const renderSource = findRenderSource(screen, screenshot);
  const viewport = screenshot.source?.viewport ?? { width: 1440, height: 1024 };
  const outputPath = staticPathFromAsset(screenshot.asset);

  await page.setViewportSize(viewport);
  await page.goto(renderSource.url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }
  });
  await mkdir(path.dirname(outputPath), { recursive: true });
  await page.screenshot({ path: outputPath, fullPage: false });

  return path.relative(process.cwd(), outputPath);
}

async function main() {
  const profilePath = readOption("profile") ?? DEFAULT_PROFILE;
  const screenId = readOption("screen");
  const scenario = readOption("scenario");

  const profile = YAML.parse(await readFile(profilePath, "utf8"));
  const screens = profile.screens ?? [];
  const selectedScreens = screenId ? screens.filter((screen) => screen.screenId === screenId) : screens;

  if (selectedScreens.length === 0) {
    throw new Error(`No screens matched ${screenId}`);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const captured = [];

  try {
    for (const screen of selectedScreens) {
      const screenshots = (screen.visualReferences ?? []).filter(
        (reference) => reference.type === "screenshot" && reference.role === "stable-documentation-snapshot",
      );
      const selectedScreenshots = scenario
        ? screenshots.filter((screenshot) => screenshot.scenario === scenario)
        : screenshots;

      if (scenario && selectedScreenshots.length === 0) {
        throw new Error(`No screenshots matched ${screen.screenId} / ${scenario}`);
      }

      for (const screenshot of selectedScreenshots) {
        const output = await captureScreenshot(page, screen, screenshot);
        captured.push(output);
      }
    }
  } finally {
    await browser.close();
  }

  if (captured.length === 0) {
    console.log("No screenshots to capture.");
    return;
  }

  await writeFile(
    path.join(process.cwd(), "static", "img", "mijn-services", "schermen", "capture-manifest.json"),
    `${JSON.stringify({ capturedAt: new Date().toISOString(), files: captured }, null, 2)}\n`,
    "utf8",
  );

  for (const file of captured) {
    console.log(`Captured ${file}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

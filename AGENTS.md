# AGENTS.md

## Rol van deze repository

Dit is de **bronrepository voor MijnServices-documentatie** (`VNG-Realisatie/mijn-services-documentatie`) en fungeert als **aanleverende site voor [developer.overheid.nl](https://developer.overheid.nl) (DON)**.

Er zijn twee publicatiestromen vanuit `main`:

1. **Productielevering aan DON (`dist-don`)** — `.github/workflows/sync-don.yml` bouwt de site in productiemodus, controleert interne én externe links en exporteert uitsluitend niet-draft content naar `dist/don/`, die naar de branch `dist-don` wordt gepusht. DON neemt alleen de geëxporteerde map `docs/mijn-services/` en afbeeldingen in `static/img/mijn-services/` op in haar eigen Docusaurus-omgeving (onder `/initiatieven/mijn-services/`).
2. **Preview inclusief drafts (GitHub Pages)** — `.github/workflows/deploy_pages.yaml` bouwt met `pnpm build --dev`, zodat ook pagina's met `draft: true` zichtbaar zijn op `https://vng-realisatie.github.io/mijn-services-documentatie/`.

De Docusaurus-schil in deze repo (`docusaurus.config.ts`, `sidebars.ts`, `src/`) is uitsluitend voor lokale ontwikkeling, linkvalidatie en de GitHub Pages-preview; die schil gaat **niet** mee naar DON.

## Waar wijzigingen thuishoren

### Bronbestanden (wel bewerken)
- `docs/mijn-services/` — inhoudelijke Markdown/MDX-pagina's (Nederlands, redenerend van buiten naar binnen vanuit inwoner/ondernemer).
- `docs/mijn-services/_model/` — gedeeld YAML-model voor begrippen, bouwstenen, use cases en klantscenario's + MDX-componenten (`ModelWeergave`, `Scenario`). Lees altijd eerst `docs/mijn-services/_model/README.md` voordat je modelbestanden of use-case-ankers aanpast.
- `docs/mijn-services/interactie-api/v0.1/openapi.yaml` en `docs/mijn-services/aansluitprofielen/**/v0.1/*.yaml` — API- en profielspecificaties.
- `static/img/mijn-services/` — iconen en diagrammen die mee-exporteren naar DON.

### Gegenereerd / afgeleid (niet handmatig bewerken)
- `dist/don/` en de branch `dist-don` — gegenereerd via `scripts/export-don.mjs`.
- `build/` en `.docusaurus/` — Docusaurus build-artefacten.
- `docs/mijn-services/interactie-api/referentie/*.mdx` en `*.json` — gegenereerd vanuit de OpenAPI-specificatie en templates in `plugins/`.
- `static/img/mijn-services/schermen/` — gegenereerd via `pnpm capture:screens` op basis van `docs/mijn-services/schermprofielen/schermprofiel.yaml`.

## Richtlijnen voor DON-compatibiliteit

- **Scheiding tussen gepubliceerd en draft**:
  - Pagina's met `draft: true` (of `publish: false` / `status: draft`) in de frontmatter worden bij `export:don` overgeslagen.
  - Gepubliceerde (niet-draft) pagina's mogen **nooit linken naar draft-pagina's** — niet in Markdown-tekst, niet in Mermaid `link`-directives en niet via `bouwstenen.<id>.pagina` in `docs/mijn-services/_model/bouwstenen.yaml`.
  - Als je de publicatiestatus van een sectie wijzigt, werk dan ook `sidebars.ts` (`isDevelopment`-condities) en eventuele modelverwijzingen bij.
- **Draagbare paden en imports**:
  - Gebruik binnen `docs/mijn-services/` relatieve links tussen documenten zodat ze zowel onder de lokale `baseUrl` (`/mijn-services-documentatie/initiatieven/mijn-services/`) als op DON (`/initiatieven/mijn-services/`) werken.
  - Plaats afbeeldingen die in MijnServices-docs worden gebruikt altijd onder `static/img/mijn-services/` (verwijs ernaar met `/img/mijn-services/...`), anders ontbreken ze na export op DON.
  - Importeer in geëxporteerde `.mdx`-pagina's geen repo-specifieke componenten uit `@site/src/...` tenzij die ook op DON bestaan; gedeelde MDX-componenten voor MijnServices horen onder `docs/mijn-services/` (zoals `_model/`).
  - Gebruik `@theme/DocCardList` voor het bouwstenenoverzicht en `sidebar_custom_props.icon` voor SVG-paden in de frontmatter. De lokale preview gebruikt een overname van [developer-overheid-nl/don-site#983](https://github.com/developer-overheid-nl/don-site/pull/983) in [`src/theme/DocCard/`](src/theme/DocCard/), met `useBaseUrl` voor de GitHub Pages-prefix. Werk bij een DON-update alleen deze theme-override gericht bij en behoud de `baseUrl`-ondersteuning. De override zelf gaat niet mee in de export; DON gebruikt zijn eigen thema.
- **Use-case-ankers**:
  - Gebruik vaste codes `UC-<CODE>-<NR>` met een expliciete `<span id="uc-..." />` direct boven de `###`-kop (zie `docs/mijn-services/_model/README.md`).

## Validatiecommando's

Voer bij inhoudelijke of structurele wijzigingen vanuit de repo-root uit:

```bash
# Productiebuild (faalt op kapotte interne links, anchors en afbeeldingen in niet-draft pagina's)
pnpm build

# Controleert interne én externe links en fragmenten in build/ (vereist eerst pnpm build)
pnpm check:links

# Volledige DON-validatie + exportbundel genereren in dist/don/
pnpm export:don

# Previewbuild inclusief draft-pagina's controleren
pnpm build --dev

# Valideer het YAML-documentatiemodel, use-case-ankers en draft-afbakening
node --test docs/mijn-services/_model/model.test.cjs
```

Aanvullende checks wanneer je specificaties of aansluitprofielen raakt:

```bash
# OpenAPI linting
pnpm lint:api

# Aansluitprofielen valideren (Python/Poetry)
cd tools/mijn-services && poetry run mijn-services validate
```

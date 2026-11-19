# AGENTS.md

## Positionering van MijnServices

MijnServices standaardiseert de **toegang tot overheidsorganisaties op het gebied van interactie**, redenerend van **buiten naar binnen**:

- **Wel (tweerichtingsinteractie & handelingsperspectief):** zowel inzicht en regie (*weten* en *volgen*) als daadwerkelijk kunnen *handelen* richting de organisatie (*doen*). Het is dus geen eenzijdige inzage-laag, maar **duplex interactie** — inclusief concrete handelingen zoals een bouwtekening uploaden, ontbrekende gegevens aanleveren, betalen, een afspraak plannen of een vraag stellen, over kanalen (mijnomgeving, app, balie, KCC, notificaties) en organisaties heen.
- **Niet:** interne bedrijfsprocessen, ambtelijke werkverdeling, zaaksysteemlogica of beheerregisters van een organisatie.
- **Waar de grens ligt:** interne registraties en standaarden (zoals ZGW, RGBZ of OpenVTB) raken MijnServices pas aan de binnenkant, als vertaling in `docs/mijn-services/informatiemodellen.md` en `docs/mijn-services/aansluitprofielen/`. Laat interne systeemstructuren of leveranciersjargon nooit doorlekken naar klantreizen, scenario's, bouwstenen, schermprofielen of de Interactie API.

Zie `docs/mijn-services/klantreis-en-principes/index.md`, `docs/mijn-services/bouwstenen/opzet/index.md` en `docs/mijn-services/scenarios/opzet.md` voor de inhoudelijke kaders en Definitions of Done.

## Rol van deze repository

Dit is de **bronrepository voor MijnServices-documentatie** en fungeert als **aanleverende site voor [developer.overheid.nl](https://developer.overheid.nl) (DON)**.

Vanuit `main` lopen twee publicatiestromen:

1. **Productielevering aan DON (`dist-don`)** — exporteert uitsluitend niet-draft content uit `docs/mijn-services/` en afbeeldingen uit `static/img/mijn-services/` naar de branch `dist-don`. DON neemt alleen die twee mappen op in haar eigen Docusaurus-omgeving (onder `/initiatieven/mijn-services/`).
2. **Preview inclusief drafts (GitHub Pages)** — bouwt met `pnpm build --dev`, zodat ook `draft: true`-pagina's zichtbaar zijn onder de lokale `baseUrl` (`/mijn-services-documentatie/`).

De Docusaurus-schil in deze repo (`docusaurus.config.ts`, `sidebars.ts`, `src/`) dient alleen voor lokale ontwikkeling, linkvalidatie en de GitHub Pages-preview en gaat **niet** mee naar DON.

## Ingecheckte afgeleide bestanden (niet handmatig bewerken)

- `docs/mijn-services/interactie-api/referentie/` — gegenereerd vanuit `docs/mijn-services/interactie-api/v0.1/openapi.yaml` en templates in `plugins/`.
- `static/img/mijn-services/schermen/` — gegenereerd via `pnpm capture:screens` op basis van `docs/mijn-services/schermprofielen/schermprofiel.yaml`.
- De branch `dist-don` — automatisch opgebouwd door GitHub Actions.

Lees eerst `docs/mijn-services/_model/README.md` voordat je begrippen, bouwstenen, use-case-ankers of klantscenario's aanpast.

## Richtlijnen voor DON-compatibiliteit

- **Nieuwe technische mogelijkheden eerst integreren**:
  - Stem nieuwe plugins, componenten en andere renderingmogelijkheden eerst af met DON en integreer en valideer ze daar vóór gebruik in publiceerbare content. Een lokale build of preview bewijst geen DON-ondersteuning.
  - `@theme/DocCardList` is geïntegreerd; de OpenAPI-plugin nog niet. Lokale generatie van bestanden maakt een plugin niet beschikbaar op DON.
- **Scheiding tussen gepubliceerd en draft**:
  - Pagina's met `draft: true` (of `publish: false` / `status: draft`) worden bij de DON-export overgeslagen.
  - Gepubliceerde pagina's mogen **nooit linken naar draft-pagina's** — niet in Markdown, niet in Mermaid `link`-directives en niet via `bouwstenen.<id>.pagina` in `docs/mijn-services/_model/bouwstenen.yaml`.
  - Werk bij het publiceren of op draft zetten van een sectie ook de `isDevelopment`-condities in `sidebars.ts` en eventuele modelverwijzingen bij.
- **Draagbare paden en componenten**:
  - Gebruik binnen `docs/mijn-services/` relatieve documentlinks zodat ze zowel lokaal als op DON werken.
  - Plaats afbeeldingen voor MijnServices altijd onder `static/img/mijn-services/` (verwijs met `/img/mijn-services/...`), anders ontbreken ze op DON.
  - Importeer in geëxporteerde `.mdx`-pagina's geen repo-specifieke code uit `@site/src/...`; gedeelde MDX-componenten voor MijnServices horen onder `docs/mijn-services/` (zoals `_model/`).
  - Gebruik `@theme/DocCardList` met `sidebar_custom_props.icon: /img/mijn-services/...` voor kaarten met eigen SVG-iconen; behoud bij updates van `src/theme/DocCard/index.tsx` de `useBaseUrl`-aanroep voor GitHub Pages.

## Validatie

```bash
# Productiebuild + interne/externe linkcheck + DON-exportbundel genereren
pnpm export:don

# Previewbuild inclusief draft-pagina's controleren
pnpm build --dev

# YAML-documentatiemodel, use-case-ankers en draft-afbakening testen
node --test docs/mijn-services/_model/model.test.cjs
```

Bij wijzigingen aan API-specificaties of aansluitprofielen:

```bash
pnpm lint:api
cd tools/mijn-services && poetry run mijn-services validate
```

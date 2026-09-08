| Eigenaar                                                  | Ingevuld door   |
| --------------------------------------------------------- | --------------- |
| Project Omnichannel - MijnServices / Team Dienstverlening | Rutger ter Borg |

<hr/>

# MijnServices Documentatie

Deze repository bevat de documentatie, standaarden, specificaties en architectuur voor **MijnServices**: de interactielaag tussen overheidsbrede kanalen (zoals MijnOmgevingen, portalen, KCC/balie) en de uitvoerende systemen en registraties van gemeenten, Rijk en uitvoeringsorganisaties.

Het doel van MijnServices is om publieke dienstverlening begrijpelijk, proactief en betrouwbaar te maken door te standaardiseren op wat iemand wil weten, doen, volgen of beheren — over kanalen en organisaties heen.

## Inhoud van de documentatie

De documentatie is onderverdeeld in de volgende onderdelen:

- **[Bouwstenen](docs/mijn-services/bouwstenen)** — De 8 MijnServices-bouwstenen: MijnTaken, MijnZaken, MijnAgenda, MijnBerichten, MijnContactmomenten, MijnGesprekken, MijnProducten en MijnProfiel.
- **[Interactiepatronen](docs/mijn-services/interactie-patronen)** — Generieke klantreizen, interactietypen en ontwerpprincipes.
- **[Kanalen](docs/mijn-services/kanalen)** — Schermprofielen en functioneel ontwerp voor MijnOmgevingen (in lijn met het NL Design System).
- **[Specificaties](docs/mijn-services/specificaties)** — Functionele modellen en de **Interactieservices API** (inclusief use-cases, schermbeschrijvingen en interactieve API-referentie).
- **[Aansluitprofielen](docs/mijn-services/aansluitprofielen)** — Gestandaardiseerde koppelingen tussen de interactielaag en bronsystemen (zoals Open VTB, ZGW API, NotifyNL).

## Lokale documentatiesite

Deze repository bevat een complete Docusaurus-omgeving om de documentatie lokaal te bekijken en te ontwikkelen:

```bash
pnpm install
pnpm start
```

De documentatie is vervolgens interactief beschikbaar op `http://localhost:3000`.

### Validatie & Build

```bash
# Typecheck
pnpm typecheck

# Controleer OpenAPI-specificatie met Spectral
pnpm lint:api

# Bouw de documentatiesite
pnpm build
```

## Publicatie naar developer.overheid.nl (DON)

Een belangrijk publicatiekanaal voor MijnServices is de kennisbank van [developer.overheid.nl](https://developer.overheid.nl). Om de documentatie daar naadloos te integreren, beschikt de repository over een geautomatiseerde exportflow:

- **Draft-ondersteuning**: Pagina's met `draft: true` in de YAML frontmatter worden lokaal wel getoond, maar bij de export automatisch uitgesloten.
- **Export genereren**:
  ```bash
  pnpm export:don
  ```
  Dit script (`scripts/export-don.mjs`) exporteert de niet-draft documentatie (`docs/mijn-services/`) en bijbehorende afbeeldingen (`static/img/mijn-services/`) naar `dist/don/`.
- **Geautomatiseerde levering**: Bij elke push naar `main` publiceert GitHub Actions (`.github/workflows/sync-don.yml`) de kant-en-klare export naar de distributiebranch `don-delivery`.

## Tooling

Voor het valideren van aansluitprofielen is aanvullende tooling aanwezig onder `tools/mijn-services/`:

```bash
cd tools/mijn-services
poetry install
poetry run mijn-services validate
```

## Licentie

EUPL 1.2 — zie [LICENSE](LICENSE).

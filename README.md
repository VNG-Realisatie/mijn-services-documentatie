| Eigenaar                                                  | Ingevuld door   |
| --------------------------------------------------------- | --------------- |
| Project Omnichannel - MijnServices / Team Dienstverlening | Rutger ter Borg |

<hr/>

# MijnServices Documentatie

> **Aanlever-repository** voor [developer.overheid.nl](https://developer.overheid.nl) (DON).

Deze repository bevat de specificaties, interactiepatronen, bouwstenen en kanaalprofielen van **MijnServices**: de interactielaag tussen kanalen (zoals MijnOmgevingen, KCC/balie en portalen) en uitvoerende systemen van gemeenten, Rijk en uitvoerders.

## Doel van deze repository

1. **Centrale uitwerking van MijnServices**: hier wordt samengewerkt aan de functionele modellen, OpenAPI-specificaties, schermprofielen en aansluitprofielen.
2. **Aanlevering aan developer.overheid.nl**: de documentatie en assets worden vanuit deze repository klaargezet en via geautomatiseerde export (`pnpm export:don`) aangeleverd aan de kennisbank van DON.
3. **Lokale Docusaurus preview**: een eigen Docusaurus-instantie met dezelfde look-and-feel en styling als developer.overheid.nl om wijzigingen direct interactief te valideren.

## Structuur van de documentatie

De content staat onder `docs/mijn-services/` conform de indeling op developer.overheid.nl:

- **[Bouwstenen](docs/mijn-services/bouwstenen)** — De 8 MijnServices-bouwstenen: MijnTaken, MijnZaken, MijnAgenda, MijnBerichten, MijnContactmomenten, MijnGesprekken, MijnProducten en MijnProfiel.
- **[Interactiepatronen](docs/mijn-services/interactie-patronen)** — Generieke klantreizen en interactietypen.
- **[Kanalen](docs/mijn-services/kanalen)** — Schermprofielen en functioneel ontwerp voor MijnOmgevingen (in lijn met NL Design System).
- **[Specificaties](docs/mijn-services/specificaties)** — Functionele modellen en de **Interactieservices API** (inclusief use-cases, schermbeschrijvingen en OpenAPI-referentie).
- **[Aansluitprofielen](docs/mijn-services/aansluitprofielen)** — Koppelingen tussen de interactielaag en bronsystemen (bijv. Open VTB, ZGW API, NotifyNL).

## Ontwikkeling & Lokaal draaien

Installeer de afhankelijkheden en start de lokale Docusaurus-omgeving:

```bash
pnpm install
pnpm start
```

De documentatie is vervolgens lokaal te bekijken op `http://localhost:3000`.

### Bouwen & Validatie

```bash
# Typecheck
pnpm typecheck

# Controleer API specificatie
pnpm lint:api

# Volledige Docusaurus build
pnpm build
```

## Aanleveren aan developer.overheid.nl (Export)

Deze repository ondersteunt een geautomatiseerde exportflow naar DON:

- **Drafts uitsluiten**: Pagina's met `draft: true` in hun YAML frontmatter worden bij export automatisch overgeslagen.
- **Export genereren**:
  ```bash
  pnpm export:don
  ```
  Dit script (`scripts/export-don.mjs`) bundelt uitsluitend de niet-draft documentatie (`docs/mijn-services/`) en de bijbehorende statische assets (`static/img/mijn-services/`) in `dist/don/`.
- **Automatische distributie**: Bij elke push naar `main` zorgt de GitHub Actions workflow `.github/workflows/sync-don.yml` ervoor dat de kant-en-klare DON-bundel gepubliceerd wordt naar de branch `don-delivery`.

## Python Tooling

Voor validatie van aansluitprofielen is aanvullende tooling beschikbaar onder `tools/mijn-services/`:

```bash
cd tools/mijn-services
poetry install
poetry run mijn-services validate
```

## Licentie

EUPL 1.2 — zie [LICENSE](LICENSE).

# MijnServices tooling

Python tooling voor MijnServices aansluitprofielen.

## Installatie

```bash
cd tools/mijn-services
poetry install
```

## Gebruik

Valideer de huidige aansluitprofielen:

```bash
poetry run mijn-services validate
```

De tooling is bewust los geplaatst van de Docusaurus-root. Docusaurus blijft via `pnpm` draaien; MijnServices-validatie en latere generatie draaien via Poetry.

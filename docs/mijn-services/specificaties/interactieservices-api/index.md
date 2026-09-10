# Interactieservices API

De InteractieServices API is het publieke contract tussen kanalen en providers
van MijnServices. Voor de eerste uitwerking ligt de focus op taken: een kanaal
kan via dit contract taakcontext ophalen, terwijl de uitvoering en brondata bij
de aangesloten provider blijven.

## Single source of truth

Voor elke versie is `openapi.yaml` de publiceerbare OpenAPI-specificatie. Dat is
het bestand waar documentatie, validatie, downloads en tooling op aansluiten.

De API bevat de operatiecontracten en DTO's. De betekenis van domeinbegrippen
zoals taken, taakstatussen en uitvoeringsmogelijkheden staat in het
[functioneel model MijnTaken](../functionele-modellen/mijn-taken/).

Als de API wordt opgesplitst in een kern met extensies, blijven de onderhoudbare
delen in bronbestanden staan en wordt `openapi.yaml` daaruit gegenereerd. De
bundel blijft dan het stabiele publicatiepunt; de bronbestanden zijn bedoeld
voor beheer door de standaardisatiegroep.

Voor versie `v0.1` is het publicatiebestand:

- [`v0.1/openapi.yaml`](./v0.1/openapi.yaml)
- [Gegenereerde API-referentie](./referentie/mijntaken-api)

## Aansluitprofielen

Aansluitprofielen beschrijven hoe een bron-API de InteractieServices API kan
vullen. Voor taken begint de uitwerking met de
[OpenVTB Taken API](../../aansluitprofielen/openvtb-taken-api/).

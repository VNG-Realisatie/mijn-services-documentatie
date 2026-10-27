---
sidebar_position: 6
---

# Architectuur en standaarden

Deze pagina bundelt het referentiemateriaal, de architectuurkaders en de open standaarden waarop MijnServices is gebouwd.

MijnServices sluit aan bij de bestaande Nederlandse en Europese standaarden voor interoperabiliteit, semantiek en gegevensuitwisseling binnen de publieke sector.

## Standaardenoverzicht

### 1. Informatiemodellen en semantiek

- **[MIM - Metamodel Informatie Modellering](https://docs.geostandaarden.nl/mim/mim/)**  
  Gemeenschappelijk kader voor conceptuele en logische informatiemodellen, met afspraken over objecttypen, kenmerken, relaties en definities.
- **[NL-SBB - Standaard voor het beschrijven van begrippen](https://www.forumstandaardisatie.nl/open-standaarden/nl-sbb)**  
  Standaard voor eenduidige, herbruikbare begripsbeschrijvingen, met begrijpelijke definities en verwijzingen naar hun (juridische) grondslag.

### 2. API-ontwerp en specificaties

- **[Nederlandse API Strategie (NLGov)](https://docs.geostandaarden.nl/api/API-Strategie/)**  
  Het overkoepelende normatieve stelsel voor API's van de Nederlandse overheid, inclusief richtlijnen voor architectuur en levenscyclusbeheer.
- **[REST API Design Rules (ADR 2.1.0)](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/)**  
  De verplichte ('pas-toe-of-leg-uit') standaard van Forum Standaardisatie voor uniforme, voorspelbare REST API's.
- **[OpenAPI Specification (OAS 3.0 / 3.1)](https://www.forumstandaardisatie.nl/open-standaarden/openapi-specification)**  
  De standaard voor machinaal leesbare en interactieve contractbeschrijvingen van API-endpoints, parameters en DTO's.
- **[CloudEvents (NL GOV profile)](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/event-cloudevents)**  
  ADR-ontwerprichtlijn en standaard envelopformaat voor het beschrijven van gebeurtenissen (events) en attenderingen bij asynchrone gegevensuitwisseling.

### 3. Beveiliging en toegangscontrole

- **[NL GOV Assurance profile for OAuth 2.0 (v1.1.0)](https://gitdocumentatie.logius.nl/publicatie/api/oauth/)**  
  Standaard voor authenticatie, autorisatie en token exchange bij overheids-API's (zowel machine-to-machine als namens ingelogde burgers/ondernemers).
- **[Digikoppeling Koppelvlakstandaard REST-API (3.0.1)](https://gitdocumentatie.logius.nl/publicatie/dk/restapi/3.0.1/)**  
  Voor betrouwbare en beveiligde gegevensuitwisseling tussen overheidsorganisaties, waar van toepassing.
- **[Federatieve Service Connectiviteit (FSC)](https://fsc-standaard.nl/standaard)**  
  Kaders en afspraken voor veilige service-to-service connectiviteit, routing en auditing tussen federatieve knooppunten (zie ook [Logius FSC documentatie](https://gitdocumentatie.logius.nl/publicatie/fsc/core/)).

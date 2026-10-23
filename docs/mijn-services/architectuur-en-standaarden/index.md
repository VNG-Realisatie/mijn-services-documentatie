---
sidebar_position: 6
---

# Architectuur en standaarden

Deze pagina bundelt het referentiemateriaal, de architectuurkaders en de open standaarden waarop MijnServices is gebouwd.

MijnServices sluit aan bij de bestaande Nederlandse en Europese standaarden voor interoperabiliteit, semantiek en gegevensuitwisseling binnen de publieke sector.

## Standaardenoverzicht

### 1. API-ontwerp en specificaties

- **[Nederlandse API Strategie (NLGov)](https://docs.geostandaarden.nl/api/API-Strategie/)**  
  Het overkoepelende normatieve stelsel voor API's van de Nederlandse overheid, inclusief richtlijnen voor architectuur en levenscyclusbeheer.
- **[REST API Design Rules (ADR 2.1.0)](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/)**  
  De verplichte ('pas-toe-of-leg-uit') standaard van Forum Standaardisatie voor uniforme, voorspelbare REST API's.
- **[OpenAPI Specification (OAS 3.0 / 3.1)](https://www.forumstandaardisatie.nl/open-standaarden/openapi-specification)**  
  De standaard voor machinaal leesbare en interactieve contractbeschrijvingen van API-endpoints, parameters en DTO's.
- **[CloudEvents (NL GOV profile)](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/event-cloudevents)**  
  ADR-ontwerprichtlijn en standaard envelopformaat voor het beschrijven van gebeurtenissen (events) en attenderingen bij asynchrone gegevensuitwisseling.

### 2. Beveiliging en toegangscontrole

- **[NL GOV Assurance profile for OAuth 2.0 (v1.1.0)](https://gitdocumentatie.logius.nl/publicatie/api/oauth/)**  
  Standaard voor authenticatie, autorisatie en token exchange bij overheids-API's (zowel machine-to-machine als namens ingelogde burgers/ondernemers).
- **[Digikoppeling Koppelvlakstandaard REST-API (3.0.1)](https://gitdocumentatie.logius.nl/publicatie/dk/restapi/3.0.1/)**  
  Voor betrouwbare en beveiligde gegevensuitwisseling tussen overheidsorganisaties, waar van toepassing.

### 3. Koppeling en federatie (Connectiviteit)

- **[Federatieve Service Connectiviteit (FSC)](https://fsc-standaard.nl/standaard)**  
  Kaders en afspraken voor veilige service-to-service connectiviteit, routing en auditing tussen federatieve knooppunten (zie ook [Logius FSC documentatie](https://gitdocumentatie.logius.nl/publicatie/fsc/core/)).

### 4. Toegankelijkheid en interactie

- **[NL Design System](https://nldesignsystem.nl/)**  
  Herbruikbare, toegankelijke en huisstijlonafhankelijke componenten voor publieke portalen en mijnomgevingen.
- **[Gebruiker Centraal](https://www.gebruikercentraal.nl/)**  
  Ontwerpprincipes voor inclusieve, mensgerichte overheidsdienstverlening (begrijpelijke taal en eenduidige interactiepatronen).

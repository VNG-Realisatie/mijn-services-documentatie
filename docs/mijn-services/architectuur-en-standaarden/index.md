---
sidebar_position: 8
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

### 2. Beveiliging en toegangscontrole

- **[NL GOV Assurance profile for OAuth 2.0 (v1.1.0)](https://gitdocumentatie.logius.nl/publicatie/api/oauth/)**  
  Standaard voor authenticatie, autorisatie en token exchange bij overheids-API's (zowel machine-to-machine als namens ingelogde burgers/ondernemers).
- **[Digikoppeling Koppelvlakstandaard REST-API (3.0.1)](https://gitdocumentatie.logius.nl/publicatie/dk/restapi/3.0.1/)**  
  Voor betrouwbare en beveiligde gegevensuitwisseling tussen overheidsorganisaties, waar van toepassing.

### 3. Gegevens en semantiek (Informatiemodellering)

- **[Metamodel Informatiemodellering (MIM 1.2)](https://www.geonovum.nl/geo-standaarden/metamodel-informatiemodellering-mim)**  
  De eenduidige standaard voor het beschrijven van informatiemodellen en begrippenkaders, onafhankelijk van specifieke databasetoepassingen.

### 4. Koppeling en federatie (Connectiviteit)

- **[Federatieve Service Connectiviteit (FSC)](https://fsc-standaard.nl/standaard)**  
  Kaders en afspraken voor veilige service-to-service connectiviteit, routing en auditing tussen federatieve knooppunten (zie ook [Logius FSC documentatie](https://gitdocumentatie.logius.nl/publicatie/fsc/core/)).

### 5. Notificaties en attenderingen

- **[CloudEvents (NL GOV profile)](https://gitdocumentatie.logius.nl/publicatie/api/adr/2.1.0/#/core/event-cloudevents)**  
  Gestandaardiseerd formaat voor het beschrijven van gebeurtenissen (events), attenderingen en notificaties over systemen en kanalen heen.

### 6. Toegankelijkheid en interactie

- **[NL Design System](https://nldesignsystem.nl/)**  
  Herbruikbare, toegankelijke en huisstijlonafhankelijke componenten voor publieke portalen en mijnomgevingen.
- **[Gebruiker Centraal](https://www.gebruikercentraal.nl/)**  
  Ontwerpprincipes voor inclusieve, mensgerichte overheidsdienstverlening (begrijpelijke taal en eenduidige interactiepatronen).

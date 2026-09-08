---
sidebar_label: MijnTaken
---

# Functioneel model MijnTaken

Het functioneel model MijnTaken beschrijft de domeinbegrippen en flows voor
taken binnen MijnServices. Dit model is de inhoudelijke single source of truth
voor wat een taak betekent, welke toestanden een taak kan hebben en welke
gebruikersflows ondersteund worden.

API-specifieke DTO's staan niet in dit model. Request bodies, response bodies,
headers, security en foutmodellen horen bij de InteractieServices API of bij een
bron-API. API's kunnen wel verwijzen naar begrippen uit dit model.

## Artefacten

Voor versie `v0.1` is het publicatiebestand:

- [`v0.1/openapi.yaml`](./v0.1/openapi.yaml)
- [Gegenereerd overzicht](./overzicht)

Dit is een OpenAPI 3.1-document met `paths: {}` en `components.schemas`. Het
bestand gebruikt OpenAPI dus als schemaformaat voor het functionele model, niet
als publicatie van een operationele API.

Het gegenereerde overzicht toont de domeinobjecten, waardelijsten en flowIds uit
dit bestand. Deze flowIds worden gebruikt door aansluitprofielen, bijvoorbeeld in
Arazzo, om bronworkflows te koppelen aan het functionele model.

---
sidebar_label: Combinaties
---

# Combinaties van aansluitprofielen

Combinaties van aansluitprofielen beschrijven hoe meerdere bron-API's samen een
flow of doeloperatie van de InteractieServices API realiseren. Een combinatie is
nodig wanneer een enkel aansluitprofiel niet alle brondata, acties of context
kan leveren die voor een functionele flow nodig zijn.

De losse aansluitprofielen blijven de plek waar de mapping tussen een bron-API
en de InteractieServices API wordt beschreven. Deze pagina is het register voor
combinaties: welke profielen samen worden gebruikt, welke flow zij ondersteunen
en welk compleetheidsbeeld daaruit volgt.

## Documentatie-eenheid

Een combinatie wordt gedocumenteerd per functionele flow of doeloperatie. De
combinatie verwijst naar de betrokken Arazzo-bestanden en beschrijft alleen wat
ontstaat door het samenspel tussen profielen:

- welke bron of bronfamilie welke rol heeft;
- welke volgorde van calls over profielen heen nodig is;
- welke gegevens tussen stappen worden doorgegeven;
- welke velden door welk profiel worden gevuld;
- welke transformaties of waardemappings profieloverstijgend zijn;
- welke issues, lokale keuzes of ontbrekende brongegevens nog openstaan.

## Gegenereerd overzicht

De handmatige tekst op deze pagina blijft beperkt tot positionering en keuzes.
Het combinatieoverzicht zelf wordt gegenereerd uit de betrokken
Arazzo-bestanden. De generator gebruikt per workflow onder meer:

- `x-mijnservices-flowId` om workflows aan dezelfde functionele flow te
  koppelen;
- `x-mijnservices-targetOperationId` om te bepalen welke doeloperatie wordt
  gevuld;
- `sourceDescriptions` om de betrokken bron-API's te herkennen;
- step outputs en workflow outputs om velddekking en gegevensoverdracht te
  bepalen;
- waardemappings en transformaties om afgeleide of niet-een-op-een velden te
  markeren.

Het resultaat is per combinatie een mapping-, sequence-, issue- en
compleetheidsoverzicht.

## Eerste kandidaatcombinaties

| Combinatie                             | Flow                       | Doel                                                                       | Status         |
| :------------------------------------- | :------------------------- | :------------------------------------------------------------------------- | :------------- |
| OpenVTB Taken API + ZGW API's          | `mijnTaken.taakRaadplegen` | Taak tonen met zaak- of documentcontext uit ZGW.                           | Te onderzoeken |
| OpenVTB Taken API + ZGW Documenten API | `mijnTaken.taakUitvoeren`  | Taak uitvoeren waarbij een document moet worden geupload of geregistreerd. | Te onderzoeken |

Deze lijst is bedoeld als startpunt. Zodra een combinatie wordt uitgewerkt,
wordt het bijbehorende Arazzo-profiel of de profielbundel de bron voor de
gegenereerde documentatie.

---
sidebar_position: 3
description: Een actie die de inwoner meestal via het overheidsportaal uitvoert.
sidebar_custom_props:
  icon: /img/mijn-services/icons/mijn-taken.svg
---

# MijnTaken

:::info[MijnTaken is in ontwikkeling]

Deze pagina beschrijft een standaard die nog in ontwikkeling is. De inhoud kan
veranderen.

:::

MijnTaken is een actie die de inwoner moet uitvoeren en die meestal vanuit het
overheidsportaal plaatsvindt.

## Functioneel model

De domeinbetekenis van MijnTaken staat in het
[functioneel model MijnTaken](../../specificaties/functionele-modellen/mijn-taken/).
Dat model beschrijft begrippen zoals `Taak`, `TaakStatus`, `TaakContext`,
`Uitvoeringsmogelijkheid` en de flows die door API's en aansluitprofielen worden
gebruikt.

API-specifieke DTO's staan niet in het functioneel model. De InteractieServices
API vertaalt deze begrippen naar request- en responsevormen voor kanalen; een
aansluitprofiel beschrijft hoe een bron-API die vormen kan vullen.

## Operaties

Voor de eerste uitwerking zijn de volgende functionele operaties leidend:

| Operatie                | FlowId                     | Doel                                                                          |
| :---------------------- | :------------------------- | :---------------------------------------------------------------------------- |
| Taken in context zoeken | `mijnTaken.contextZoeken`  | Taken ophalen die relevant zijn voor een klant en optionele context.          |
| Taak raadplegen         | `mijnTaken.taakRaadplegen` | Informatie ophalen die nodig is om een taak te begrijpen.                     |
| Taak uitvoeren          | `mijnTaken.taakUitvoeren`  | De handeling bij een taak starten of voltooien bij de verantwoordelijke bron. |

In de InteractieServices API landen deze operaties voorlopig op
`POST /context/zoek` en `GET /taken/{uuid}`. Uitvoering zelf blijft bij de bron;
het kanaal krijgt de informatie die nodig is om de gebruiker naar de juiste
uitvoering te leiden.

## Schermen

Schermen koppelen gebruikersinteractie aan functionele flows en API-operaties.
De exacte schermuitwerking kan per kanaal verschillen, maar de eerste koppeling
voor MijnTaken is:

| Scherm                 | Doel                                                 | FlowId                     |
| :--------------------- | :--------------------------------------------------- | :------------------------- |
| `SCR-TAKENOVERZICHT`   | Openstaande en relevante taken tonen.                | `mijnTaken.contextZoeken`  |
| `SCR-TAKEN-IN-CONTEXT` | Taken tonen binnen een zaak, product of dossier.     | `mijnTaken.contextZoeken`  |
| `SCR-TAAKDETAIL`       | Eén taak begrijpen voordat de gebruiker handelt.     | `mijnTaken.taakRaadplegen` |
| `SCR-TAAKUITVOEREN`    | De gebruiker naar de uitvoering van een taak leiden. | `mijnTaken.taakUitvoeren`  |
| `SCR-GEEN-TAKEN`       | Uitleg geven als er geen relevante taken zijn.       | `mijnTaken.contextZoeken`  |

Bij de verdere uitwerking krijgt elk scherm een interactietabel met de
bijbehorende InteractieServices-operatie en, waar relevant, het aansluitprofiel
dat de gegevens levert.

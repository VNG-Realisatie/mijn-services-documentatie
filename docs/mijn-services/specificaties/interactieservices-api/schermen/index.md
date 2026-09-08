---
sidebar_position: 1
---

# Schermen

Elk scherm krijgt een eigen pagina met:

- Een korte omschrijving en (later) een Figma-link of screenshot
- De **interactietabel**: per UI-element een ID, de interactie en de bijbehorende API-aanroep
- Welke [use cases](../use-cases/index.md) het scherm gebruiken

Schermen worden geïdentificeerd met het patroon `SCR-<ONDERWERP>`. IDs zijn stabiel en worden door use cases aangehaald.

## Overzicht

| ID                     | Scherm                                                                      |
| :--------------------- | :-------------------------------------------------------------------------- |
| `SCR-RECENT`           | [Recent](./recent.md)                                                       |
| `SCR-MIJN-TAKEN`       | [Mijn taken](./mijn-taken.md)                                               |
| `SCR-TAKEN-IN-CONTEXT` | [Taken in context](./taken-in-context.md)                                   |
| `SCR-TAAK-UITVOEREN`   | [Taak uitvoeren](./taak-uitvoeren.md)                                       |
| `SCR-DIGID-EH`         | [DigiD eenvoudige herauthenticatie](./digid-eenvoudige-herauthenticatie.md) |

Zie ook het [procesoverzicht](../procesoverzicht.md) voor de BPMN en de volledige schermflow.

## Huidige situatie

De API is opgezet als API-first: elk portaal kan de API aanroepen. Op dit moment is [`SCR-RECENT`](./recent.md) alleen uitgewerkt voor MijnOverheid, en valt [`SCR-MIJN-TAKEN`](./mijn-taken.md) onder de Lokale Omgeving. In beide gevallen is de API-aanroep gedocumenteerd, zodat ook een Lokale Omgeving in de toekomst een eigen recent-scherm kan bouwen.

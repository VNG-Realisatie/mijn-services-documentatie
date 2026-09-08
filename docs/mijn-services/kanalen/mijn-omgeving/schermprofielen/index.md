---
sidebar_position: 1
---

# Schermprofielen MijnOmgeving

Schermprofielen leggen vast hoe de MijnOmgeving het interactie- en functioneel ontwerp vertaalt naar concrete schermen, UI-elementen, states en API-aanroepen.

Elk schermprofiel bevat:

- Een korte omschrijving en screenshot of Figma-weergave
- De **interactietabel**: per UI-element een ID, de interactie en de bijbehorende API-operatie
- Welke [use cases](../../../specificaties/interactieservices-api/use-cases/index.md) het scherm gebruiken

Schermen worden geïdentificeerd met het patroon `SCR-<ONDERWERP>`. IDs zijn stabiel en worden door use cases aangehaald.

## Overzicht van schermen

| ID                     | Scherm                                                                      |
| :--------------------- | :-------------------------------------------------------------------------- |
| `SCR-RECENT`           | [Recent](./recent.md)                                                       |
| `SCR-MIJN-TAKEN`       | [Mijn taken](./mijn-taken.mdx)                                              |
| `SCR-TAKEN-IN-CONTEXT` | [Taken in context](./taken-in-context.mdx)                                  |
| `SCR-TAAK-UITVOEREN`   | [Taak uitvoeren](./taak-uitvoeren.md)                                       |
| `SCR-DIGID-EH`         | [DigiD eenvoudige herauthenticatie](./digid-eenvoudige-herauthenticatie.md) |

Zie ook het [procesoverzicht](../../../specificaties/interactieservices-api/procesoverzicht.md) voor de BPMN en de volledige schermflow.

## Huidige situatie

De InteractieServices API is opgezet als kanaalonafhankelijk: elk portaal of kanaal kan de API aanroepen. Op dit moment is [`SCR-RECENT`](./recent.md) alleen uitgewerkt voor MijnOverheid, en valt [`SCR-MIJN-TAKEN`](./mijn-taken.md) onder de Lokale Omgeving. In beide gevallen is de API-aanroep gedocumenteerd, zodat ook een Lokale Omgeving in de toekomst een eigen recent-scherm kan bouwen.

Daarnaast is er een machineleesbaar [schermprofiel (YAML)](./schermprofiel.yaml) beschikbaar voor geautomatiseerde validatie en tooling.

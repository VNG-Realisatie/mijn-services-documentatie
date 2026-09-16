---
sidebar_position: 1
sidebar_label: Functioneel ontwerp
---

# Functioneel ontwerp van MijnOmgeving

Het functioneel ontwerp beschrijft het gebruikersverloop binnen MijnOmgeving.
Het maakt duidelijk welke stappen, beslissingen, states en kanaalspecifieke
keuzes nodig zijn voordat dit wordt uitgewerkt in concrete schermprofielen.

Het functioneel ontwerp is daarmee de brug tussen de generieke bouwsteen en de
concrete schermuitwerking binnen het kanaal.

| Onderdeel | Bouwsteen | Doel | Schermprofielen |
| :-- | :-- | :-- | :-- |
| Taken in context raadplegen | MijnTaken | Taken tonen en selecteren binnen een zaak, product of dossier. | [Taken in context](../schermprofielen/taken-in-context) |

## Relatie met schermprofielen

Schermprofielen leggen per scherm vast hoe het kanaal het functioneel ontwerp
vertaalt naar zichtbare UI-states, interacties en InteractieServices
API-operaties. Het functioneel ontwerp beschrijft eerst het gebruikersverloop;
het schermprofiel maakt daarna de mapping naar scherm en API concreet.

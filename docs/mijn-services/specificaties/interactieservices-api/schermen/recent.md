---
sidebar_position: 2
---

# [SCR-RECENT] Recent

Landingspagina met een "Recent"-blok. Taken verschijnen hier naast andere recente activiteiten zoals berichten en zaken. Er is geen aparte takenlijstpagina in dit portaal; daarvoor is [`SCR-MIJN-TAKEN`](./mijn-taken.md) bedoeld.

## Schermvoorbeeld

_Mockup nog toe te voegen._

**Figma:** _nog toe te voegen_

## Interacties

| ID       | Element   | Interactie                                                       | Bedoeling / resultaat                                                                                                                                            | API |
| :------- | :-------- | :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- |
| **R.1**  | Taakkaart | Pagina laden                                                     | Toont openstaande taken in het "Recent"-blok                                                                                                                     | —   |
| **R.2a** | Taakkaart | Klik — taak uitvoerbaar in portaal (betaling, upload)            | Opent [`SCR-TAKEN-IN-CONTEXT`](./taken-in-context.md); via C.8 _Uitvoeren_ landt de klant op [`SCR-TAAK-UITVOEREN`](./taak-uitvoeren.md)                           | —   |
| **R.2b** | Taakkaart | Klik — taak gekoppeld aan zaak, niet uitvoerbaar in portaal      | Opent [`SCR-TAKEN-IN-CONTEXT`](./taken-in-context.md) (zaakcontext); uitvoering vereist portaalwissel via [`SCR-DIGID-EH`](./digid-eenvoudige-herauthenticatie.md) | —   |
| **R.2c** | Taakkaart | Klik — taak niet aan zaak gekoppeld, niet uitvoerbaar in portaal | Portaalwissel direct via [`SCR-DIGID-EH`](./digid-eenvoudige-herauthenticatie.md); taak wordt geopend in [`SCR-TAKEN-IN-CONTEXT`](./taken-in-context.md)           | —   |

:::note[Geen directe API-aanroepen]
MijnOverheid beheert het "Recent"-overzicht intern. De integratie met de MijnTaken API verloopt via de **MijnOverheid Takenlijst** (interne dienst) — de portaallaag zelf doet geen directe aanroepen naar de MijnTaken API.
:::

## Gebruikt in use cases

- [UC-01 Taken raadplegen](../use-cases/uc-01-taken-raadplegen.md)
- [UC-02 Taak afhandelen](../use-cases/uc-02-taak-afhandelen.md)

## Huidige situatie

Dit scherm is op dit moment uitgewerkt voor MijnOverheid. Het "Recent"-blok toont niet alleen taken, maar ook andere open items zoals berichten en zaken. Een aparte takenlijstpagina zoals [`SCR-MIJN-TAKEN`](./mijn-taken.md) bestaat niet in dit portaal.

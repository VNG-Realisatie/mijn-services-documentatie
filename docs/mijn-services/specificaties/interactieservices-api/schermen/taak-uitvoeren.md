---
sidebar_position: 6
---

# [SCR-TAAK-UITVOEREN] Taak uitvoeren

Dedicated uitvoerscherm voor één specifieke taak. De klant landt hier via een deeplink en hoeft geen keuze te maken in een lijst — de taak staat direct klaar voor uitvoering.

Het scherm is taaktype-afhankelijk:

- **Bestandsupload** — klant voegt één of meer documenten toe en dient ze in. Bestandsupload is een smal geval van een formulier.
- **Formulier** _(uit te werken)_ — klant vult een dynamisch formulier in.

:::note[Betaling]
Een betaaltaak leidt altijd direct tot een redirect naar de betaalprovider, zonder tussenkomst van dit scherm. Betalen is altijd uitvoerbaar vanuit elk portaal en vereist geen portaalwissel. De knop _Betalen_ staat op [`SCR-TAKEN-IN-CONTEXT`](./taken-in-context.md) (interactie C.9).
:::

## Instappaden

| Vanaf                                                    | Portaal | Hoe                                                                                                                            |
| :------------------------------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------- |
| [`SCR-TAKEN-IN-CONTEXT`](./taken-in-context.md)          | LO      | Knop _Uitvoeren_ (interactie C.8) — direct, geen portaalwissel                                                                 |
| [`SCR-TAKEN-IN-CONTEXT`](./taken-in-context.md)          | MO      | Knop _Uitvoeren_ (C.8) — uitsluitend voor taken uitvoerbaar in MO (upload; formulieren nog uit te werken); binnen MijnOverheid |
| [`SCR-DIGID-EH`](./digid-eenvoudige-herauthenticatie.md) | LO      | Na succesvolle herauthenticatie (portaalwissel vanuit MO); deeplink opent direct de specifieke taak voor uitvoering            |

## Schermvoorbeeld

_Mockup nog toe te voegen._

**Figma:** _nog toe te voegen_

## Interacties

| ID      | Element             | Interactie             | Bedoeling / resultaat                                                                  | API                                                                       |
| :------ | :------------------ | :--------------------- | :------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **U.1** | Scherm laden        | Automatisch            | Taakinformatie en de bijpassende uitvoerinterface worden getoond op basis van taaktype | `GET /taken/{uuid}` (lokaal renderen vereist `uitvoering.definitie`)      |
| **U.2** | Bestandsupload veld | Bestanden toevoegen    | Klant selecteert één of meer documenten ter aanlevering                                | —                                                                         |
| **U.3** | Knop _Verzenden_    | Klik (met bevestiging) | Documenten worden ingediend bij de provider; deze markeert de taak als afgerond        | `POST` naar `uitvoering.definitie.endpoint` (externe URL bij de provider) |
| **U.4** | Terug-navigatie     | Klik                   | Navigeert terug naar [`SCR-TAKEN-IN-CONTEXT`](./taken-in-context.md)                   | —                                                                         |

:::note[Taaktype-afhankelijk]
Niet alle interacties zijn bij elke taak aanwezig. U.2 en U.3 gelden voor uploadtaken. Formulieren (nog uit te werken) volgen een vergelijkbaar patroon.
:::

## Gebruikt in use cases

- [UC-02 Taak afhandelen](../use-cases/uc-02-taak-afhandelen.md)

## Verschillen per portaal

- **MijnOmgeving (LO):** alle taaktypen worden hier uitgevoerd.
- **MijnOverheid (MO):** alleen taken die MijnOverheid zelf kan uitvoeren verschijnen hier (upload; formulieren nog uit te werken). Betalingstaken worden nooit via dit scherm afgehandeld — die starten een directe redirect vanuit [`SCR-TAKEN-IN-CONTEXT`](./taken-in-context.md). Taken die MO niet zelf kan uitvoeren worden via [`SCR-DIGID-EH`](./digid-eenvoudige-herauthenticatie.md) doorgestuurd naar dit scherm in het LO-portaal.

---
sidebar_position: 4
---

import AnnotatedPreview from '@site/src/components/AnnotatedPreview';

# [SCR-TAKEN-IN-CONTEXT] Taken in context

Gecombineerd scherm dat de klant bereikt vanuit een zaak, product of ander
object — bijv. via een deeplink vanuit MijnZaken of een erfpachtportaal. Het
scherm toont links de gefilterde takenlijst voor dat object en rechts het detail
van de geselecteerde taak. Er is geen apart navigatiescherm voor het taakdetail.

Wanneer de klant arriveert via een portaalwissel vanuit MijnOverheid ([`SCR-DIGID-EH`](./digid-eenvoudige-herauthenticatie.md)), opent het scherm via een deeplink met de specifieke taak al geselecteerd in het detailpaneel. De klant maakt geen keuze in de lijst en start direct met uitvoeren.

## Schermvoorbeeld

<AnnotatedPreview
src="https://nl-design-system.github.io/mijn-services/iframe.html?id=mijn-omgeving-mijnzaken-detailpagina--default&viewMode=story"
height={750}
title="Taak in context schermvoorbeeld (MijnOmgeving zaakdetail als placeholder)"
annotations={[
{ id: 'C.2', x: '25%', y: '45%', label: 'Taak selecteren in lijst' },
{ id: 'C.5', x: '72%', y: '38%', label: 'Knop Afronden' },
]}
/>

:::note[Placeholder]
Dit voorbeeld gebruikt de _zaakdetail_-template als tijdelijke invulling — er bestaat nog geen losse taak-in-context-template in de [MijnServices Storybook](https://nl-design-system.github.io/mijn-services/). Klik op een bolletje om de bijbehorende interactie te zien.
:::

**Figma:** _nog toe te voegen_

## Interacties — lijstpaneel

:::warning[Concept]
Deze interactietabellen zijn een werkversie. Inhoud en interacties kunnen nog wijzigen op basis van werkgroepfeedback.
:::

| ID      | Element         | Interactie  | Bedoeling / resultaat                                                                                                                                 | API                                         |
| :------ | :-------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------ |
| **C.2** | Kolom _Titel_   | Klik op rij | Detailpaneel toont de geselecteerde taak; bij instap via portaalwissel vanuit MO is de taak al voorgeselecteerd en hoeft de klant niets te selecteren | `GET /taken/{uuid}`                         |
| **C.4** | Terug-navigatie | Klik        | Navigeert terug naar het bovenliggende object (zaak, product, e.d.)                                                                                   | — (deeplink return-URL van het bronportaal) |

## Interacties — detailpaneel

| ID      | Element          | Interactie             | Bedoeling / resultaat                                                                                                                                             | API                                                               |
| :------ | :--------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| **C.5** | Knop _Afronden_  | Klik (met bevestiging) | Het portaal navigeert naar `uitvoering.canonicalUrl` bij de provider; daar handelt de klant de taak af. De provider zet de status op `afgerond`.                  | — (redirect naar provider)                                        |
| **C.8** | Knop _Uitvoeren_ | Klik                   | Navigeert naar [`SCR-TAAK-UITVOEREN`](./taak-uitvoeren.md) als `uitvoering.definitie` aanwezig is; anders redirect naar `uitvoering.canonicalUrl` bij de provider | —                                                                 |
| **C.9** | Knop _Betalen_   | Klik                   | Redirect naar `uitvoering.canonicalUrl` (betaalprovider). Altijd uitvoerbaar vanuit elk portaal — geen portaalwissel nodig                                        | — (extern; zie [UC-02 A5](../use-cases/uc-02-taak-afhandelen.md)) |

## Gebruikt in use cases

- [UC-01 Taken raadplegen](../use-cases/uc-01-taken-raadplegen.md)
- [UC-02 Taak afhandelen](../use-cases/uc-02-taak-afhandelen.md)

## Verschillen per portaal

In **MijnOverheid (MO)** verschijnt dit scherm in de context van een zaak. Afhankelijk van het type taak:

- **Uitvoerbaar in MO** (betaling, bestandsupload; later ook formulieren): C.8 _Uitvoeren_ opent [`SCR-TAAK-UITVOEREN`](./taak-uitvoeren.md) binnen MijnOverheid. Dit is een groeipad: het aantal ondersteunde taaktypen breidt zich geleidelijk uit.
- **Niet uitvoerbaar in MO**: C.8 _Uitvoeren_ start een portaalwissel via [`SCR-DIGID-EH`](./digid-eenvoudige-herauthenticatie.md); na herauthenticatie landt de klant direct op [`SCR-TAAK-UITVOEREN`](./taak-uitvoeren.md) in het LO-portaal.

In **MijnOmgeving (LO)** worden alle taaktypen ondersteund. C.8 _Uitvoeren_ navigeert direct naar [`SCR-TAAK-UITVOEREN`](./taak-uitvoeren.md) zonder portaalwissel.

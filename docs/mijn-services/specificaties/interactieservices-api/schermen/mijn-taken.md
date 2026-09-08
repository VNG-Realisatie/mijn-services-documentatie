---
sidebar_position: 3
---

import AnnotatedPreview from '@site/src/components/AnnotatedPreview';

# [SCR-MIJN-TAKEN] Mijn taken

Overzicht van de aan de klant (burger of ondernemer) toegewezen taken.

## Schermvoorbeeld

<AnnotatedPreview
src="https://nl-design-system.github.io/mijn-services/iframe.html?id=mijn-omgeving-taken--default&viewMode=story"
height={700}
title="Takenoverzicht schermvoorbeeld (MijnOmgeving)"
annotations={[
{ id: 'L.1', x: '10%', y: '10%', label: 'Mijn taken (paginatitel)' },
{ id: 'L.2', x: '68%', y: '42%', label: 'Klik op taak (→ Taakdetail)' },
]}
/>

**Figma:** _nog toe te voegen_

## Interacties

:::warning[Concept]
Deze interactietabel is nog niet bijgewerkt op de huidige API en is een werkversie. Sommige verwijzingen kunnen achterlopen op het OpenAPI-contract.
:::

| ID      | Element             | Interactie   | Bedoeling / resultaat                          | API                                                                     |
| :------ | :------------------ | :----------- | :--------------------------------------------- | :---------------------------------------------------------------------- |
| **L.1** | Paginatitel         | Pagina laden | Lijst van taken voor de ingelogde klant        | [`POST /context/zoek`](/api/zoek-context) (`klantId`, geen `contextId`) |
| **L.2** | Kolom _Titel_       | Klik op rij  | Opent taak in context (`SCR-TAKEN-IN-CONTEXT`) | —                                                                       |
| **L.3** | Kolom _Vervaldatum_ | Sorteren     | Lijst wordt gesorteerd op vervaldatum          | —                                                                       |

## Gebruikt in use cases

- [UC-01 Taken raadplegen](../use-cases/uc-01-taken-raadplegen.md)
- [UC-02 Taak afhandelen](../use-cases/uc-02-taak-afhandelen.md)

## Huidige situatie

Dit scherm is op dit moment uitgewerkt voor de Lokale Omgeving (aangeboden door de dienstverlener). MijnOverheid toont taken niet als aparte lijst, maar verwerkt ze in een generiek "Recent"-overzicht ([`SCR-RECENT`](./recent.md)) op de landingspagina. De API-aanroep is hier gedocumenteerd zodat ook andere portalen in de toekomst een takenoverzicht kunnen aanbieden.

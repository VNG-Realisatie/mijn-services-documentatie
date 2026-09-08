---
sidebar_position: 2
---

# [UC-01] Taken raadplegen

**Actor:** klant (burger of ondernemer)

**Doel:** een overzicht krijgen van de eigen openstaande taken en de details van een specifieke taak bekijken.

**Voorwaarden:**

- Klant is ingelogd in MijnOverheid of MijnOmgeving.
- Er is minstens één taak beschikbaar voor deze klant.

## R1 — Hoofdflow

1. Klant opent het portaal en komt op een scherm waar de eigen taken worden getoond — bijvoorbeeld [`SCR-MIJN-TAKEN`](../schermen/mijn-taken.md) (een dedicated takenoverzicht) of [`SCR-RECENT`](../schermen/recent.md) (een "Recent"-blok waarin taken naast andere activiteiten verschijnen).
2. Klant ziet de eigen openstaande taken met titel, status en eventueel vervaldatum.
3. Klant klikt een taak aan en komt op [`SCR-TAKEN-IN-CONTEXT`](../schermen/taken-in-context.md).
4. Klant leest de toelichting van de context en de daarbij behorende taken.

## Alternatieve flows

- **R2 — Geen taken beschikbaar:** het overzicht toont een lege-staat melding; er zijn geen rijen om op te klikken.
- **R3 — Taken in context:** de klant benadert [`SCR-TAKEN-IN-CONTEXT`](../schermen/taken-in-context.md) vanuit een zaak, product of ander object (bijv. via een deeplink vanuit MijnZaken of een erfpachtportaal). De lijst is vooraf gefilterd op het gerelateerde object via [`POST /context/zoek`](/api/zoek-context) met `contextId`. De klant ziet alleen de taken die bij dat object horen en kan ze raadplegen en afhandelen zonder het overzicht van alle taken te zien.

## Resultaat

De klant heeft de inhoud van één taak gelezen en staat op `SCR-TAKEN-IN-CONTEXT`. Vanuit dit punt kan de klant [UC-02 Taak afhandelen](./uc-02-taak-afhandelen.md) starten.

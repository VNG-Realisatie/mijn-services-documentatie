---
sidebar_position: 3
---

# [UC-02] Taak afhandelen

**Actor:** klant (burger of ondernemer)

**Doel:** een aan de klant toegewezen taak raadplegen en als afgerond markeren.

**Voorwaarden:**

- Klant is ingelogd in MijnOverheid of MijnOmgeving.
- Er is minstens één taak met status `open` voor deze klant.

## A1 — Hoofdflow

1. Klant opent het portaal en komt op een scherm waar de eigen taken worden getoond — bijvoorbeeld [`SCR-MIJN-TAKEN`](../schermen/mijn-taken.md) (een dedicated takenoverzicht) of [`SCR-RECENT`](../schermen/recent.md) (een "Recent"-blok waarin taken naast andere activiteiten verschijnen).
2. Klant ziet de eigen openstaande taken met titel, status en eventueel vervaldatum.
3. Klant klikt een taak aan en komt op [`SCR-TAKEN-IN-CONTEXT`](../schermen/taken-in-context.md).
4. Klant leest de toelichting van de context en de daarbij behorende taken.
5. Klant klikt op _Afronden_ — interactie [C.5](../schermen/taken-in-context.md#interacties--detailpaneel) — en bevestigt de actie.
6. Systeem markeert de taak als `afgerond` en navigeert terug naar het overzicht.

## Alternatieve flows

- **A2 — Taak is al afgerond:** de knop _Afronden_ ([C.5](../schermen/taken-in-context.md#interacties--detailpaneel)) is niet zichtbaar; klant kan alleen raadplegen.
- **A3 — Conflict bij afronden:** de API geeft `409` (bv. status inmiddels gewijzigd door backend). UI toont een melding en herlaadt de taak.
- **A4 — Taken in context:** de klant benadert [`SCR-TAKEN-IN-CONTEXT`](../schermen/taken-in-context.md) direct vanuit een zaak, product of ander object (bijv. via een deeplink vanuit MijnZaken of een erfpachtportaal). De lijst is vooraf gefilterd op het gerelateerde object via [`POST /context/zoek`](/api/zoek-context) met `contextId`.
- **A5 — Taak vereist betaling:** in plaats van _Afronden_ wordt de klant via een redirect doorgestuurd naar het portaal van de lokale overheid, dat een betaalprovider aanroept. Na geslaagde betaling werkt de provider de taakstatus zelf bij en redirect de klant terug naar MijnOverheid/MijnOmgeving met een statusmelding. Het portaal herlaadt de taak via de API om de actuele status te tonen.

  ```mermaid
  sequenceDiagram
      actor Gebruiker
      Gebruiker->>+MO: Klik betalen TAAK 123
      MO->>+Portaal LO: Redirect naar portaal van lokale overheid<br>bijv. portaal.gemeente.nl/mo-acties/taken/123?hash=xyz&return=MO-url
      Portaal LO->>+LO Taken API: Haal TAAK 123 op
      LO Taken API-->>-Portaal LO: TAAK 123 (JSON)
      Portaal LO->>Portaal LO: Valideer taak hash (URL "hash" waarde)
      Portaal LO->>+Betaal provider: Redirect met betaal parameters
      Betaal provider-->>Gebruiker: Toon betaal pagina
      Gebruiker->>Betaal provider: Betalen
      Betaal provider-->>-Portaal LO: Betaald
      Portaal LO->>+LO Taken API: Status van TAAK 123 bijwerken
      LO Taken API-->>-Portaal LO: OK
      Portaal LO->>Portaal LO: Redirect actie bepalen (URL "return" waarde)
      Portaal LO-->>-MO: Redirect met status
      MO-->>-Gebruiker: Toon status
  ```

- **A6 — Upload-taak:** de taak vereist dat de klant één of meer documenten aanlevert. De klant uploadt de bestanden via het portaal, waarna de dienstverlener ze koppelt aan de zaak en de taak als voltooid markeert.

  :::note[Perspectief: MijnOverheid]
  Dit diagram toont de flow zoals die verloopt via het MijnOverheid portaal. Lokale portalen (MijnOmgeving) kennen een vergelijkbare flow, maar communiceren rechtstreeks met de MijnTaken API van de dienstverlener zonder tussenkomst van de MijnOverheid Takenlijst.
  :::

  ```mermaid
  sequenceDiagram
      actor DA as Dienstafnemer
      participant MOFO as MijnOverheid Portaal
      participant MOTL as MijnOverheid Takenlijst
      participant TAPI as MijnTaken API
      participant ZS as Dienstverlener Zaaksysteem

      ZS->>MOTL: Cloudevent: Taak toegewezen
      DA->>MOFO: Login middels DigiD
      MOFO->>MOTL: Vraag open taken op
      MOTL-->>MOFO: Open taken
      MOFO->>DA: Toont open taken in "Recent" overzicht op landing page
      DA->>MOFO: Klikt op upload-taak
      MOFO->>TAPI: Vraag taak-details op
      TAPI-->>MOFO: Taak-details
      MOFO->>DA: Toont taak-details
      DA->>MOFO: Voegt document(en) toe
      DA->>MOFO: Klikt op "Verzenden"
      MOFO->>TAPI: Upload document(en)
      TAPI->>ZS: Koppel document(en) aan taak
      ZS-->>TAPI: Success response
      TAPI-->>MOFO: Success response
      MOFO->>DA: Toont bevestiging taak voltooid
      ZS->>MOTL: Cloudevent: Taak voltooid
  ```

## Resultaat

De taak heeft status `afgerond` en verdwijnt uit het overzicht van openstaande taken.

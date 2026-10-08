---
sidebar_position: 4
---

# Procesoverzicht

## Schermflow

Het onderstaande diagram toont de navigatieflow langs de [schermprofielen](../schermprofielen/) per startpunt en taaktype. **Blauw** is het beoogde pad voor MijnOverheid, **groen** voor MijnOmgeving. De betaalprovider (grijs) is extern en bereikbaar vanuit beide portalen.

```mermaid
flowchart TD
    RECENT["[SCR-RECENT]\nRecent"]
    MIJN_TAKEN["[SCR-MIJN-TAKEN]\nMijn taken"]
    TIC_A["[SCR-TAKEN-IN-CONTEXT]\nTaken in context\n(zaakcontext)"]
    TIC_B["[SCR-TAKEN-IN-CONTEXT]\nTaken in context"]
    UITVOEREN_A["[SCR-TAAK-UITVOEREN]\nTaak uitvoeren"]
    BETALING["Betaalprovider\n(extern)"]
    UITVOEREN_B["[SCR-TAAK-UITVOEREN]\nTaak uitvoeren"]

    %% Rij-hints: nodes op dezelfde rij plaatsen
    RECENT ~~~ MIJN_TAKEN
    TIC_A ~~~ TIC_B
    UITVOEREN_A ~~~ BETALING ~~~ UITVOEREN_B

    %% Portaal A
    RECENT -->|"zaakcontext beschikbaar"| TIC_A
    TIC_A -->|"uitvoerbaar"| UITVOEREN_A
    TIC_A -->|"betaling"| BETALING
    UITVOEREN_A -.->|"terug"| TIC_A
    BETALING -.->|"terug"| TIC_A

    %% Portaal B
    MIJN_TAKEN --> TIC_B
    TIC_B --> UITVOEREN_B
    TIC_B -->|"betaling"| BETALING
    UITVOEREN_B -.->|"terug"| TIC_B
    BETALING -.->|"terug"| TIC_B

    %% Portaalwissels
    RECENT -->|"geen zaakcontext\n→ SCR-DIGID-EH"| TIC_B
    TIC_A -->|"niet uitvoerbaar\n→ SCR-DIGID-EH"| UITVOEREN_B
    UITVOEREN_B -.->|"terug na portaalwissel"| TIC_A

    classDef portaalA fill:#dbeafe,stroke:#3b82f6,color:#1e3a5f
    classDef portaalB fill:#dcfce7,stroke:#22c55e,color:#14532d
    classDef extern  fill:#f3f4f6,stroke:#9ca3af,color:#374151

    class RECENT,TIC_A,UITVOEREN_A portaalA
    class MIJN_TAKEN,TIC_B,UITVOEREN_B portaalB
    class BETALING extern
```

:::note[Eerste versie]
Dit diagram is een eerste schets en wordt bijgehouden naarmate schermen en taaktypen zich ontwikkelen.
:::

## Technische uitvoeringsvoorbeelden

De functionele doelen en eisen staan bij
[UC-02 Taak afhandelen in MijnTaken](../bouwstenen/mijn-taken/index.md#uc-02-taak-afhandelen).
De onderstaande voorbeelden zijn overgenomen uit de eerdere use-case-uitwerking.
Ze beschrijven mogelijke technische samenwerking, geen verplicht kanaalpad of
vastgesteld API-contract.

:::note[Ontwerpvoorbeelden]
De voorbeelden zijn nog niet afgestemd op alle huidige schermprofielen en
API-operaties. Met name de betaalroute en lokale uploadondersteuning kunnen per
portaal verschillen. Gebruik de schermprofielen voor de actuele
portaaluitwerking en de Interactie API voor het contract.
:::

### Betaling via een andere omgeving

In dit voorbeeld gaat de gebruiker via een lokale omgeving naar een
betaalprovider. Na verwerking werkt de verantwoordelijke provider de
taakstatus bij. Terugkeer naar een portaal is op zichzelf geen bewijs dat de
betaling is geslaagd; het portaal moet de actuele uitkomst vaststellen.

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

### Documenten aanleveren via MijnOverheid

In dit voorbeeld levert de gebruiker documenten aan. De dienstverlener koppelt
die aan de dienstverlening en bevestigt de uitkomst. Het diagram veronderstelt
dat de betrokken omgeving uploaden ondersteunt; andere omgevingen kunnen de
gebruiker naar de uitvoerlocatie verwijzen.

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

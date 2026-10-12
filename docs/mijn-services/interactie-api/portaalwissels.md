---
sidebar_position: 1
---

# Portaalwissels

Wanneer een portaal een handeling niet lokaal uitvoert (Implementatieniveau 1 of 2), verlaat de inwoner of ondernemer het portaal om de taak elders te voltooien. We spreken van een **portaalwissel** wanneer deze overgang plaatsvindt over een vertrouwens- en organisatiedomein heen.

## Cross-domein wissel vs. interne applicatie-overdracht

Niet elke doorverwijzing is een portaalwissel:

- **Portaalwissel (Cross-domein):** De overgang tussen twee verschillende organisaties (bijvoorbeeld van MijnOverheid naar de MijnOmgeving van een gemeente of uitvoerder). Omdat de doelorgaan geen toegang heeft tot de sessie van het vertrekkende portaal, is **herauthenticatie** vereist (zoals DigiD Eenvoudige Herauthenticatie).
- **Interne applicatie-overdracht (Binnen één domein):** Een portaal leidt de gebruiker door naar een specialistische deelfunctie binnen dezelfde organisatie (zoals een parkeerapplicatie of formulierenserver). Dit wordt intern afgehandeld via SSO, gedeelde cookies of een beveiligde token-URL; er is geen nieuwe DigiD-stap nodig.

---

## Sessieoverdracht en DigiD Herauthenticatie

Bij een cross-domein portaalwissel landt de gebruiker via een deeplink op de omgeving van de aanbieder. Om te borgen dat de gebruiker direct in de juiste context verder kan zonder opnieuw volledig in te loggen, wordt [DigiD Eenvoudige Herauthenticatie](../schermprofielen/uitvoering/digid-eenvoudige-herauthenticatie.md) (`SCR-DIGID-EH`) ingezet.

---

## Navigatieflow langs portalen

Onderstaand diagram toont de navigatieflow langs de [schermprofielen](../schermprofielen/index.md) per startpunt en taaktype. **Blauw** is het pad voor MijnOverheid, **groen** voor de lokale MijnOmgeving. De betaalprovider (grijs) is extern en bereikbaar vanuit beide portalen.

```mermaid
flowchart TD
    RECENT["[SCR-RECENT]\nRecent"]
    MIJN_TAKEN["[SCR-MIJN-TAKEN]\nMijn taken"]
    TIC_A["[SCR-TAKEN-IN-CONTEXT]\nTaken in context\n(zaakcontext)"]
    TIC_B["[SCR-TAKEN-IN-CONTEXT]\nTaken in context"]
    UITVOEREN_A["[SCR-TAAK-UITVOEREN]\nTaak uitvoeren"]
    BETALING["Betaalprovider\n(extern)"]
    UITVOEREN_B["[SCR-TAAK-UITVOEREN]\nTaak uitvoeren"]

    %% Rij-hints
    RECENT ~~~ MIJN_TAKEN
    TIC_A ~~~ TIC_B
    UITVOEREN_A ~~~ BETALING ~~~ UITVOEREN_B

    %% Portaal A (MijnOverheid)
    RECENT -->|"zaakcontext beschikbaar"| TIC_A
    TIC_A -->|"uitvoerbaar"| UITVOEREN_A
    TIC_A -->|"betaling"| BETALING
    UITVOEREN_A -.->|"terug"| TIC_A
    BETALING -.->|"terug"| TIC_A

    %% Portaal B (MijnOmgeving)
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

---

## Technische uitvoeringsflows

### 1. Betaling via externe provider en terugkeer

Bij betaling leidt het portaal de gebruiker door naar de betaalprovider. Na afronding keert de gebruiker terug met een statusparameter. Het portaal verifieert vervolgens de actuele status via de Interactie API:

```mermaid
sequenceDiagram
    actor Gebruiker
    Gebruiker->>+MO: Klik betalen TAAK 123
    MO->>+Portaal LO: Redirect naar portaal van lokale overheid<br>bijv. portaal.gemeente.nl/mo-acties/taken/123?return=MO-url
    Portaal LO->>+LO Taken API: Haal TAAK 123 op
    LO Taken API-->>-Portaal LO: TAAK 123 (JSON)
    Portaal LO->>+Betaal provider: Redirect met betaalparameters
    Betaal provider-->>Gebruiker: Toon betaalpagina
    Gebruiker->>Betaal provider: Betalen
    Betaal provider-->>-Portaal LO: Betaald
    Portaal LO->>+LO Taken API: Status bijwerken naar afgerond
    LO Taken API-->>-Portaal LO: OK
    Portaal LO-->>-MO: Redirect met status (?status=betaald)
    MO-->>-Gebruiker: Toon feedback & herlaad actuele status via API
```

### 2. Documenten aanleveren via MijnOverheid

Wanneer een portaal documentupload lokaal ondersteunt (Niveau 3), worden documenten direct ingediend bij het endpoint van de provider:

```mermaid
sequenceDiagram
    actor DA as Dienstafnemer
    participant MOFO as MijnOverheid Portaal
    participant MOTL as MijnOverheid Takenlijst
    participant TAPI as MijnTaken API
    participant ZS as Dienstverlener Zaaksysteem

    ZS->>MOTL: Notificatie: Taak toegewezen
    DA->>MOFO: Login via DigiD
    MOFO->>MOTL: Vraag open taken op
    MOTL-->>MOFO: Open takenlijst
    MOFO->>DA: Toon open taken in overzicht
    DA->>MOFO: Klikt op upload-taak
    MOFO->>TAPI: Vraag taakdetails op
    TAPI-->>MOFO: Taakdetails met uploadconfiguratie
    DA->>MOFO: Voegt document(en) toe & verzendt
    MOFO->>TAPI: Upload document(en) naar submitUrl
    TAPI->>ZS: Koppel document(en) aan zaak
    ZS-->>TAPI: Bevestiging
    TAPI-->>MOFO: Succes respons
    MOFO->>DA: Toon bevestiging taak ingediend
```

---

## Terugkeer en transiente statusfeedback

Wanneer de gebruiker na een handeling terugkeert naar het oorspronkelijke portaal (via de `returnUrl`), kan de ontvangende partij een statusparameter meegeven (bijvoorbeeld `?status=betaald`).

- **Transiente UX-feedback:** Het portaal mag deze parameter gebruiken om de gebruiker direct feedback te geven (bijvoorbeeld een melding: _"Uw betaling is verwerkt"_).
- **Statusverificatie via API:** De parameter is geen juridisch of technisch bewijs van afronding. Het portaal herlaadt de taak via de Interactie API (`GET /taken/{uuid}`) om de actuele, door de bron bevestigde toestand te tonen.

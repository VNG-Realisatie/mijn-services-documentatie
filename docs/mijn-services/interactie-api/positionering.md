---
draft: true
sidebar_position: 2
---

# Positionering

De Interactie API vormt de gestandaardiseerde interactielaag tussen gebruikerskanalen (zoals portalen en apps) en de uitvoerende overheid. In plaats van systemen of registers direct aan te sluiten op een front-end, standaardiseert de Interactie API op wat inwoners en ondernemers willen weten, doen of volgen: redenerend van **buiten naar binnen**.

## Rolverdeling in het landschap

De Interactie API wordt primair aangesproken door **BFF's (Backend for Frontend)** van portalen en apps. Dit bewaakt een zuivere scheiding van verantwoordelijkheden:

```mermaid
flowchart TD
    subgraph Kanalen["Kanalen & Frontends"]
        PORTAAL["Portaal / App (bv. MijnOverheid, MijnOmgeving)"]
        BFF["BFF (Backend for Frontend)"]
    end

    subgraph Interactielaag["MijnServices Interactielaag"]
        API["Interactie API"]
    end

    subgraph Uitvoering["Dienstverleners & Bronnen"]
        BRON["Aanbieder / Uitvoerend systeem"]
        REGISTER["Registraties & Zaakomgevingen"]
    end

    PORTAAL --> BFF
    BFF -->|context & interacties| API
    API -->|aansluitprofiel / adapter| BRON
    PORTAAL -.->|lokale interactie| GEBRUIKER[Gebruiker]
    BRON --> REGISTER
```

Deze scheiding waarborgt de [uitgangspunten van de Interactie API](./index.md#uitgangspunten-voor-de-rolverdeling): een interactiecontract (geen beheerregister), uitvoering bij de bron, context als primair concept en een recursief samenstelbare werking.

---

## Geschakelde en gefedereerde werking

In een landschap met meerdere overheden en portalen kan de Interactie API op verschillende niveaus worden ingezet. De interface is recursief toepasbaar en hoeft niet altijd direct op een bronsysteem aan te sluiten: **een Interactie API kan zelf als bron fungeren voor een bovenliggende Interactie API**.

```mermaid
flowchart LR
    subgraph KanaalA["Kanaal A (bv. MijnOverheid)"]
        BFFA["BFF A"]
    end

    subgraph Federatie["Gefedereerde laag"]
        APIA["Interactie API A (Aggregatie / Routering)"]
    end

    subgraph AanbiederB["Aanbieder B (bv. Gemeente)"]
        APIB["Interactie API B"]
        BRONB["Gemeentelijke bronnen"]
    end

    subgraph AanbiederC["Aanbieder C (bv. Uitvoerder)"]
        APIC["Interactie API C"]
        BRONC["Landelijke bronnen"]
    end

    BFFA --> APIA
    APIA -->|server-naar-server| APIB
    APIA -->|server-naar-server| APIC
    APIB --> BRONB
    APIC --> BRONC
```

### Hoe federatie werkt

- **Agnostisch voor onderliggende techniek:** Voor BFF A maakt het niet uit of API A direct data ophaalt of doorvraagt naar API B en C. Het contract blijft identiek.
- **Klantidentificatie in context:** In een geschakelde keten moet de federatieve laag weten namens welke klant een verzoek loopt (`klantId`) en de autorisatie context- en partijspecifiek kunnen doorgeleiden.
- **Samengesteld beeld:** De bovenliggende API kan gegevens uit meerdere onderliggende Interactie API's aggregeren tot één antwoord voor het portaal, zonder dat het portaal met tientallen bronnen afzonderlijk hoeft te koppelen.

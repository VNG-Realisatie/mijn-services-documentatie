---
sidebar_position: 4
---

import BpmnViewer from '@site/src/components/BpmnViewer';

# Procesoverzicht

Het onderstaande diagram toont de hoofdflow van het MijnTaken-proces op hoog niveau, met swimlanes voor MijnOverheid en het lokale portaal.

:::note[In ontwikkeling]
Dit diagram toont alleen de hoofdflow. Exception flows (zoals een mislukte betaling, een ingetrokken taak of het verlopen van een termijn) zijn nog niet uitgewerkt.
:::

<BpmnViewer url="/FlowchartMijnTaken.bpmn" height="30vh" />

## Schermflow

Het onderstaande diagram toont de navigatieflow langs de [schermen](./schermen/index.md) per startpunt en taaktype. **Blauw** is het beoogde pad voor MijnOverheid, **groen** voor MijnOmgeving. De betaalprovider (grijs) is extern en bereikbaar vanuit beide portalen.

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

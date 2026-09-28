---
sidebar_position: 1
---

# Uitvoeringsschermen

Uitvoeringsschermen ondersteunen de daadwerkelijke transactie of handeling van de gebruiker. Denk hierbij aan het invullen van een formulier, het uploaden van een bewijsstuk of het voltooien van een betaling.

## Doel en interactiepatroon

Waar de overige interactielagen zich vaak afspelen binnen het overkoepelende portaal (zoals MijnOverheid of een gemeentedashboard), vindt de **uitvoering altijd plaats bij de bronhouder of een gespecialiseerde verwerker**:

- **Portaalwissels:** De inwoner start de uitvoering en schakelt soepel over van het portaal naar de e-dienst of het zaaksysteem van de uitvoerende gemeente of overheidsorganisatie (of vice versa).
- **Herauthenticatie & Veiligheid:** Soms vereist de uitvoering een hoger betrouwbaarheidsniveau (step-up authenticatie) of een sessie-overdracht tussen verschillende overheidssystemen.
- **Transactie-afronding:** Na afronding van de transactie keert de gebruiker terug naar het portaal en verandert de toestand van de taak direct naar `afgerond`.

## Beschikbare schermprofielen

| ID | Schermprofiel | Scope | Doel |
| :--- | :--- | :--- | :--- |
| `SCR-TAAK-UITVOEREN` | [Taak uitvoeren](./taak-uitvoeren.md) | Transactie / Portaalwissel | De inwoner naar de juiste uitvoeringsomgeving leiden en de status bijhouden. |
| `SCR-DIGID-EH` | [DigiD eenvoudige herauthenticatie](./digid-eenvoudige-herauthenticatie.md) | Beveiliging / Sessie | Naadloze authenticatiestap bij de overgang naar de lokale uitvoeringsomgeving. |

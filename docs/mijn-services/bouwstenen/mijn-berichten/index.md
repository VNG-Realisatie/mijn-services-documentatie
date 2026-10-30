---
sidebar_position: 4
description: Informatieve berichten en meldingen voor inwoners en ondernemers.
sidebar_custom_props:
  icon: /img/mijn-services/icons/mijn-berichten.svg
---

import ModelWeergave from '../../\_model/ModelWeergave';

# MijnBerichten

MijnBerichten biedt de mogelijkheid om informatieve berichten of meldingen te
versturen aan inwoners en ondernemers. Bijvoorbeeld over een taak die nog
uitgevoerd moet worden of over een genomen besluit. Dit werkt hetzelfde als de
berichtenbox van MijnOverheid.

## Doel en gebruikersbehoeften

Een inwoner of ondernemer krijgt regelmatig berichten van de overheid: bijvoorbeeld over een aanvraag, besluit, betaling, vergunning of informatievoorziening. MijnBerichten ondersteunt de interactie waarin de overheid informatie verstrekt aan de gebruiker.
Een bericht geeft duidelijkheid over wat de overheid communiceert, waarom iemand dit ontvangt en wat de betekenis ervan is. Hierdoor hoeft de gebruiker niet zelf verschillende kanalen of organisaties te raadplegen om relevante informatie terug te vinden.

| **Vraag van de gebruiker**                  | Wat MijnBerichten ondersteunt                                                                                        |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Heeft de overheid iets met mij gedeeld?** | Geeft een overzicht van ontvangen berichten op één herkenbare plek.                                                  |
| **Waar gaat dit bericht over?**             | Biedt een duidelijk onderwerp, afzender en begrijpelijke inhoud van het bericht.                                     |
| **Waarom ontvang ik dit bericht?**          | Toont de relatie met een aanvraag, zaak, product of andere dienstverlening wanneer die beschikbaar is.               |
| **Is dit belangrijk voor mij?**             | Geeft inzicht in het karakter van het bericht en eventuele urgentie of termijn.                                      |
| **Moet ik hier iets mee doen?**             | Geeft een verwijzing naar de benodigde vervolgstap wanneer een reactie, betaling of aanvullende informatie nodig is. |
| **Kan ik dit later terugvinden?**           | Maakt berichten en bijbehorende documenten beschikbaar als onderdeel van de communicatiehistorie.                    |

## Scope en samenhang

MijnBerichten richt zich op het ontvangen, bekijken en begrijpen van communicatie vanuit de overheid.

### Afbakening

MijnBerichten vult andere bouwstenen aan:

- **MijnBerichten** toont ontvangen communicatie, de inhoud daarvan en eventuele bijlagen.
- De context achter een bericht (zoals een aanvraag, behandeling, besluit of dossier) wordt weergegeven via [MijnZaken](../mijn-zaken/index.md).
- Wanneer een bericht vraagt om een handeling (bijvoorbeeld informatie aanleveren of betalen), wordt deze actie uitgevoerd via [MijnTaken](../mijn-taken/index.md)
- Vragen stellen of reageren op een bericht loopt via [MijnGesprekken](../mijn-gesprekken/index.md).
- Interne communicatie, werkverdeling en het opstellen van berichten binnen de overheid vallen buiten deze bouwsteen.

### Combineren in de weergave (composability)

Een bericht staat vaak niet op zichzelf. In een digitale mijnomgeving kan MijnBerichten gecombineerd worden met andere bouwstenen. Bijvoorbeeld: een besluitbericht wordt getoond binnen de context van een zaak (MijnZaken), met een eventuele vervolgstap als taak (MijnTaken) en de mogelijkheid om vragen te stellen (MijnGesprekken).

## Begrippenkader

Onderstaand model toont de onderlinge relaties tussen de verschillende begrippen. Daaronder zijn in de tabel de definities van de begrippen opgenomen.

<ModelWeergave weergave="mijn-berichten" />

## Use cases

<span id="uc-brh-01" />

### UC-BRH-01: Berichten raadplegen en openen

**Doel:** Weten welke berichten vanuit de overheid gestuurd zijn naar de gebruiker.

MijnBerichten ondersteunt dat de gebruiker:

- een overzicht heeft van ontvangen berichten, met informatie over de inhoud en afzender van het bericht;
- kan herkennen welke berichten nieuw of nog niet gelezen zijn;
- een specifiek bericht kan openen, om de inhoud, het berichttype, de bijlagen en de gerelateerde zaken of producten te tonen.
- vanuit de eventuele context de gekoppelde berichten kan raadplegen.

**Resultaat:** De gebruiker heeft overzicht over de communicatie vanuit de overheid en weet welke berichten beschikbaar zijn.

<span id="uc-brh-02" />

### UC-BRH-02: Bericht bewaren en terugvinden

**Doel:** Belangrijke communicatie later opnieuw kunnen raadplegen.

MijnBerichten ondersteunt dat de gebruiker:

- eerder ontvangen berichten kan terugvinden;
- bijlagen opnieuw kan raadplegen;
- communicatiehistorie kan gebruiken als naslag bij contact met de overheid.

**Resultaat:** De gebruiker beschikt over een betrouwbaar overzicht van ontvangen overheidscommunicatie.

## Attenderen

Attenderingen rond MijnBerichten zorgen ervoor dat gebruikers weten wanneer relevante communicatie beschikbaar is:

- **Nieuw bericht beschikbaar:** wanneer een overheidsorganisatie nieuwe informatie beschikbaar stelt.
- **Herinnering aan ongelezen bericht:** wanneer het relevant is dat de gebruiker kennisneemt van beschikbare informatie.

Een attendering bevat voldoende informatie om de gebruiker te laten begrijpen waar het bericht over gaat en verwijst veilig naar de betreffende berichtomgeving.

## Gerelateerd

| Onderdeel | Verwijzingen |
| --- | --- |
| **Informatiemodellen** | [Gemeentelijke modellen](../../informatiemodellen.md#gemeentelijke-modellen) |

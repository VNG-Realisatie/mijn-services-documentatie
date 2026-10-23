---
sidebar_position: 2
sidebar_label: MijnZaken
title: MijnZaken
description: Kanaalonafhankelijk overzicht, duiding en voortgang bij lopende en afgeronde dienstverlening.
sidebar_custom_props:
  icon: /img/mijn-services/icons/mijn-zaken.svg
draft: true
---

import ModelWeergave from '../../\_model/ModelWeergave';

# MijnZaken

MijnZaken brengt de context, voortgang en documenten van overheidsdienstverlening samen. De bouwsteen maakt voor inwoners en ondernemers begrijpelijk wat er speelt, wat de huidige stand van zaken betekent en wat de verwachte vervolgstappen zijn, onafhankelijk van het kanaal of het onderliggende zaaksysteem.

## Doel en gebruikersbehoeften

Een inwoner of ondernemer wil iets voor elkaar krijgen in het dagelijks leven of bedrijf (een vergunning, voorziening, subsidie of melding). MijnZaken ondersteunt het interactiemoment waarin iemand wil weten hoe het met die aanvraag of melding staat, wat er al gebeurd is en wat men kan verwachten.

Statusinformatie vermindert onzekerheid, voorkomt onnodig herhaald contact en geeft duidelijkheid over waar iemand aan toe is.

| Vraag van de gebruiker                                            | Wat MijnZaken ondersteunt                                                          |
| :---------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **Welke aanvragen of meldingen lopen er bij de overheid?**        | Overzicht van lopende en afgeronde dossiers.                                       |
| **Waar staat mijn aanvraag en wat betekent dat nu voor mij?**     | De actuele fase vertaald naar begrijpelijke taal en herkenbare mijlpalen.          |
| **Wat is de verwachte volgende stap en wanneer hoor ik iets?**    | Inzicht in de verwachte behandeltermijn of wat de overheid nu doet.                |
| **Wat is er definitief besloten en welke stukken horen daarbij?** | Inzage in formele besluiten, documenten, eerdere contactmomenten en het resultaat. |
| **Moet ik zelf nog iets doen om verder te kunnen?**               | Maakt vervolgstappen en eventuele openstaande acties in de context zichtbaar.      |

## Scope en samenhang

MijnZaken richt zich op de context, status en historie van de behandeling. Andere bouwstenen vullen dit aan:

- **MijnZaken** toont de voortgang, het actuele beeld en formele documenten van een zaak.
- Actiegerichte handelingen (zoals een document aanleveren of leges betalen) worden afgehandeld via [MijnTaken](../mijn-taken/index.md).
- Vragen stellen of digitaal overleg voeren loopt via [MijnGesprekken](../mijn-gesprekken/index.md).
- Formele notificaties en berichten lopen via [MijnBerichten](../mijn-berichten/index.md).
- Interne behandelprocessen, werkverdeling en dossieropbouw blijven binnen de vak- en zaaksystemen van de behandelende organisatie.

### Combineren in de weergave (composability)

In een digitale mijnomgeving worden deze interacties vaak gecombineerd in één scherm: bijvoorbeeld een zaakdetailpagina die tegelijkertijd de actuele status toont (MijnZaken), openstaande acties presenteert (MijnTaken) en de dialoog met de behandelaar weergeeft (MijnGesprekken).

## Begrippenkader

Onderstaand model toont de onderlinge relaties tussen de verschillende begrippen. Daaronder zijn in de tabel de definities van de begrippen opgenomen.

```mermaid
---
config:
  layout: elk
  class:
    hideEmptyMembersBox: true
---
classDiagram
direction TB
    class ZAAK
    class RESULTAAT
    class BESLUIT
    class GESPREK
    class KLANTCONTACT
    class ZAAKTYPE
    class VERZOEK
    class TAAK
    class ENKINFOOBJ["INFORMATIEOBJECT"]
    class PRODUCT
    class ACTOR
    class PARTIJ
    class PLAN
    class STATUS

    link GESPREK "mijn-gesprekken/" "Ga naar MijnGesprekken"
    link ZAAK "mijn-zaken/" "Ga naar MijnZaken"
    link PRODUCT "mijn-producten/" "Ga naar MijnProducten"
    link BERICHT "mijn-berichten/" "Ga naar MijnBerichten"
    link TAAK "mijn-taken/" "Ga naar MijnTaken"
    link PLAN "mijn-plannen/" "Ga naar MijnPlannen"

    RESULTAAT --> ZAAK : is bereikt bij afsluiting van
    BESLUIT --> ZAAK : is uitkomst van
    GESPREK --> ZAAK : betreft
    KLANTCONTACT --> ZAAK : betreft
    PRODUCT --> ZAAK : is geleverd vanuit

    ZAAK --> STATUS : heeft
    TAAK --> ZAAK : hoort bij
    ZAAK --> ZAAKTYPE : is van
    ZAAK --> VERZOEK : betreft behandeling van
    ZAAK --> ENKINFOOBJ : heeft
    ZAAK --> ACTOR : wordt behandeld door
    ZAAK --> PARTIJ : heeft als initiator
    ZAAK --> PARTIJ : heeft als belanghebbende
    ZAAK --> PLAN : is onderdeel van
```

&nbsp;

| Begrip               | Definitie                                                                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ACTOR**            | Iets dat of iemand die voor de overheidsorganisatie werkzaamheden uitvoert.                                                                                                                    |
| **BESLUIT**          | Een schriftelijke beslissing van een bestuursorgaan, inhoudende een publiekrechtelijke rechtshandeling.                                                                                        |
| **GESPREK**          | Een digitale dialoog tussen een burger, bedrijf of instelling en (een) overheidsorganisatie(s).                                                                                                |
| **INFORMATIEOBJECT** | Een INFORMATIEOBJECT waarvan aard, omvang en/of vorm aanleiding geven het als één geheel te behandelen en te beheren.                                                                          |
| **KLANTCONTACT**     | Contactmoment tussen een burger, bedrijf of instelling en een overheidsorganisatie dat werkelijk heeft plaatsgevonden.                                                                         |
| **PARTIJ**           | Persoon of organisatie waarmee de overheidsorganisatie een relatie heeft.                                                                                                                      |
| **PLAN**             | Een gestructureerde en vastgelegde beschrijving van doelen, keuzes, activiteiten en middelen, waarin wordt uitgewerkt wat de burger wil bereiken, hoe dat gebeurt, wanneer en met welke inzet. |
| **PRODUCT**          | Iets wat wordt voortgebracht en een concrete of herkenbare waarde heeft voor een burger, bedrijf, instelling of andere overheidsorganisatie.                                                   |
| **RESULTAAT**        | Een gedefinieerde, concrete uitkomst van een ZAAK zoals het verlenen of weigeren van een vergunning, een toekenning of een afwijzing, en is het het 'antwoord' op de aanleiding van die ZAAK.  |
| **STATUS**           | Een aanduiding van de stand van zaken van een ZAAK op basis van betekenisvol behaald resultaat voor de initiator van de ZAAK.                                                                  |
| **TAAK**             | Een welomschreven en afgebakende hoeveelheid werk dat iemand doet of moet doen, horende bij een ZAAK of betrekking hebbende op een PRODUCT.                                                    |
| **VERZOEK**          | Een tot een overheidsorganisatie gerichte vraag of aanspraak om een bepaalde beslissing, handeling of reactie te verkrijgen.                                                                   |
| **ZAAK**             | Een samenhangende hoeveelheid werk met een welgedefinieerde aanleiding en een welgedefinieerd eindresultaat, waarvan kwaliteit en doorlooptijd bewaakt moeten worden.                          |
| **ZAAKTYPE**         | Specificatie van de wijze van besturing van, en vast te leggen informatie over een bedrijfsproces dat als zaak uitgevoerd wordt.                                                               |

<details>
<summary>Modelweergave MijnZaken</summary>

<ModelWeergave weergave="mijn-zaken" />

</details>

## Use cases

<span id="uc-zkn-01" />

### UC-ZKN-01: Zaken overzien en terugvinden

**Doel:** Overzicht krijgen van lopende en historische zaken en de juiste zaak kunnen selecteren.

MijnZaken ondersteunt dat de gebruiker:

- lopende zaken in één oogopslag ziet en kan onderscheiden op onderwerp en actualiteit;
- afgeronde zaken en uitkomsten uit het verleden kan terugvinden en filteren;
- direct ziet welke organisatie de zaak behandelt en wanneer er voor het laatst iets is gewijzigd;
- duidelijke uitleg krijgt wanneer er geen zaken beschikbaar zijn.

**Resultaat:** De gebruiker heeft overzicht en kan doorklikken naar de context van een specifieke zaak.

<span id="uc-zkn-02" />

### UC-ZKN-02: Zaakstatus en voortgang volgen

**Doel:** Begrijpen wat de actuele stand van een specifieke zaak is en wat er nu gebeurt.

MijnZaken ondersteunt dat de gebruiker:

- de huidige status en doorlopen mijlpalen begrijpt via een duidelijke tijdlijn;
- inzicht heeft in de verwachte doorlooptijd of de eerstvolgende stap van de overheid;
- ziet of er acties openstaan (met verwijzing naar MijnTaken);
- begrijpt of getoonde termijnen indicatief of formeel zijn;
- duidelijke uitleg krijgt als informatie vertraagd of tijdelijk niet beschikbaar is.

**Resultaat:** De gebruiker heeft duidelijkheid over waar de aanvraag staat en hoeft geen onnodig contact op te nemen voor een statusupdate.

<span id="uc-zkn-03" />

### UC-ZKN-03: Zaakdocumenten en besluit inzien

**Doel:** Formele stukken, ingediende bijlagen en het definitieve besluit raadplegen.

MijnZaken ondersteunt dat de gebruiker:

- kan nagaan welke documenten zijn ingediend of door de overheid zijn verstrekt;
- het formele besluit en de toelichting daarop kan inzien en downloaden;
- begrijpt wat het resultaat betekent en welke rechtsmiddelen (zoals bezwaar) eventueel openstaan.

**Resultaat:** De gebruiker beschikt over de formele stukken en begrijpt de rechtsgevolgen van het besluit.

## Attenderen

Attenderingen rond MijnZaken informeren de gebruiker proactief over relevante veranderingen in het behandelproces:

- **Belangrijke mijlpaal bereikt:** bijvoorbeeld wanneer een aanvraag formeel in behandeling is genomen.
- **Termijnwijziging of vertraging:** wanneer een verwachte behandeltermijn verschuift, voorzien van toelichting.
- **Besluit beschikbaar:** zodra het formele besluit klaarstaat om in te zien.

Een attendering vermeldt waar het over gaat en verwijst veilig direct naar de betreffende zaakcontext in het portaal.

## Gerelateerd

| Onderdeel           | Verwijzingen                                                                                                                                   |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **Klantscenario's** | [Mijn aanvraag volgen](../../scenarios/index.md#mijn-aanvraag-volgen), [Een reactie begrijpen](../../scenarios/index.md#een-reactie-begrijpen) |
| **Schermprofielen** | [Schermprofielen](../../schermprofielen/index.md)                                                                                              |

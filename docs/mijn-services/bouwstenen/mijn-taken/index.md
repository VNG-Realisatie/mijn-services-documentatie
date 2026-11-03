---
sidebar_position: 3
sidebar_label: MijnTaken
title: MijnTaken
description: Weten wat er nog moet gebeuren en een gevraagde handeling met zekerheid afronden.
sidebar_custom_props:
  icon: /img/mijn-services/icons/mijn-taken.svg
---

import ModelWeergave from '../../\_model/ModelWeergave';

# MijnTaken

MijnTaken brengt handelingsperspectief in overheidsdienstverlening. De bouwsteen helpt inwoners en ondernemers begrijpen wat er nog moet gebeuren om verder te kunnen, waarom een handeling nodig is en hoe ze die met zekerheid afronden — zoals een ontbrekend document aanleveren, een formulier invullen of leges betalen.

## Doel en gebruikersbehoeften

Een inwoner of ondernemer wil iets voor elkaar krijgen in het dagelijks leven of bedrijf (een vergunning, voorziening, subsidie of melding). Een verzoek van de overheid is daarin slechts een noodzakelijke tussenstap. MijnTaken ondersteunt het interactiemoment waarin de overheid actie van de gebruiker vraagt.

Duidelijkheid over wat er moet gebeuren en een tijdige bevestiging na afloop nemen onzekerheid weg en voorkomen vertraging in de behandeling.

| Vraag van de gebruiker                              | Wat MijnTaken ondersteunt                                                                  |
| :-------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| **Moet ik zelf nog iets doen om verder te kunnen?** | Geeft overzicht van openstaande acties en signaleert wat direct aandacht vraagt.           |
| **Wat wordt er van mij gevraagd, en waarom?**       | Biedt een begrijpelijke toelichting in de context van de lopende aanvraag of dienst.       |
| **Voor wanneer moet ik reageren?**                  | Maakt termijnen inzichtelijk en legt uit wat de consequentie is van niet tijdig handelen.  |
| **Hoe en waar kan ik dit regelen?**                 | Biedt een passende en veilige manier om de handeling direct uit te voeren of te vervolgen. |
| **Is het goed aangekomen en wat gebeurt er nu?**    | Geeft direct bevestiging en toont een actuele, betrouwbare status van de handeling.        |

## Scope en samenhang

MijnTaken beschrijft de interactie rond het begrijpen, opstarten en voltooien van handelingen die de inwoner of ondernemer zelf moet of kan uitvoeren.

### Afbakening

MijnTaken richt zich zuiver op de actie van de gebruiker. Andere bouwstenen vullen dit aan:

- **MijnTaken** faciliteert de actie (begrijpen wat nodig is, uitvoeren en bevestiging krijgen).
- De context waarbinnen de taak ontstaat (zoals een aanvraag, dossier of besluit) wordt beheerd door [MijnZaken](../mijn-zaken/index.md).
- Vragen over een verzoek lopen via [MijnGesprekken](../mijn-gesprekken/index.md).
- Attenderingen en formele notificaties lopen via [MijnBerichten](../mijn-berichten/index.md).
- Interne werkinstructies en taken voor ambtenaren vallen buiten deze bouwsteen; MijnTaken gaat uitsluitend over handelingen van de burger of ondernemer.

### Combineren in de weergave (composability)

Een openstaande taak staat zelden op zichzelf. In een portaal of app wordt MijnTaken vaak ingebed in de context van andere bouwstenen: bijvoorbeeld een actieknop "Ontbrekend document aanleveren" direct geplaatst in de tijdlijn van een lopende vergunningaanvraag (MijnZaken).

## Begrippenkader

Onderstaand model toont de onderlinge relaties tussen de verschillende begrippen. Daaronder zijn in de tabel de definities van de begrippen opgenomen.

De begrippen sluiten aan bij het woordgebruik en de informatiemodellen binnen overheidsorganisaties. Ze beschrijven de betekenis aan de organisatiekant; in communicatie met inwoners en ondernemers kan een begrijpelijker benaming passender zijn.

<ModelWeergave weergave="mijn-taken" />

## Use cases

<span id="uc-tkn-01" />

### UC-TKN-01: Taken raadplegen

**Doel:** Weten welke acties openstaan en begrijpen wat er van de gebruiker wordt gevraagd.

MijnTaken ondersteunt dat de gebruiker:

- openstaande taken kan vinden in een algemeen overzicht én in de context van een specifieke zaak of dienst;
- direct herkent waar het verzoek over gaat, bij welke zaak de taak hoort en van welke overheidsorganisatie het afkomstig is;
- begrijpt wat er nodig is, waarom de handeling nodig is en binnen welke termijn deze moet worden uitgevoerd;
- per taak de deadline en een eventuele urgentie-indicator ziet, bijvoorbeeld 'Nog 2 dagen';
- openstaande en afgeronde taken die bij een specifieke zaak horen kan raadplegen;
- ziet welke uitvoeringsmogelijkheden beschikbaar zijn;
- duidelijke uitleg krijgt wanneer er op dit moment geen openstaande acties zijn.

**Resultaat:** De gebruiker weet welke acties openstaan, wat er wordt gevraagd en wanneer actie nodig is. De gebruiker kan besluiten wanneer en hoe de actie uit te voeren. Alleen raadplegen verandert de status van de taak niet.

<span id="uc-tkn-02" />

### UC-TKN-02: Taak afhandelen

**Doel:** De gevraagde handeling uitvoeren en met zekerheid afronden.

MijnTaken ondersteunt dat de gebruiker:

- de handeling kan uitvoeren via de geboden mogelijkheid, bijvoorbeeld een document uploaden, een formulier invullen of betalen;
- de actie direct kan starten vanuit de taak, bijvoorbeeld via een actieknop;
- bij een overstap naar een andere omgeving, zoals een betaalprovider of specialistisch loket, naadloos kan doorgaan;
- direct een duidelijke bevestiging krijgt van wat is ingediend of uitgevoerd;
- ziet of de taak definitief is afgerond of dat er nog een beoordeling volgt door de organisatie;
- bij een onderbreking of fout duidelijke handelingsopties krijgt om het opnieuw te proberen;
- niet opnieuw wordt gevraagd een reeds voltooide handeling uit te voeren.

**Resultaat:** De handeling is verricht, de gebruiker heeft een bevestiging en weet wat het vervolg is.

## Sequentiediagrammen

### Statussen van een taak
Een taak kan verschillende statussen hebben. Als de taak wordt aangemaakt, krijgt de taak initieel de status ‘Open’. Als de taak door de externe partij is uitgevoerd, wordt de status op ‘Uitgevoerd’ gezet. Daarna kan het resultaat van de uitvoering door een medewerker worden beoordeeld. Zodra dit resultaat is beoordeeld en verwerkt, krijgt de taak de status ‘Verwerkt’. Daarmee is de taak afgehandeld.

Als de taak niet is uitgevoerd (bijvoorbeeld na het verstrijken van de handelingsdatum) wordt de status automatisch (via een timer) of handmatig door een medewerker gewijzigd naar ‘Niet uitgevoerd’.

Als de externe partij de taak analoog heeft uitgevoerd (bijvoorbeeld als een document bij de balie is afgegeven) dan kan de medewerker de status direct van ‘Open’ naar ‘Verwerkt’ zetten.

Als de taak niet door de externe partij uitgevoerd hoeft te worden of als de taak foutief is ingeboekt, dan kan de medewerker de taak op ‘Afgebroken’ zetten. Er vindt daarna geen verwerking van de taak meer plaats.

```mermaid
stateDiagram-v2
    OPEN: Open
    UITGEVOERD: Uitgevoerd
    NIET_UITGEVOERD: Niet uitgevoerd
    AFGEBROKEN: Afgebroken
    VERWERKT: Verwerkt

    direction LR
    [*] --> OPEN
    OPEN --> UITGEVOERD
    OPEN --> NIET_UITGEVOERD
    OPEN --> AFGEBROKEN
	  UITGEVOERD --> VERWERKT
	  NIET_UITGEVOERD --> VERWERKT
	  AFGEBROKEN --> [*]
	  VERWERKT --> [*]
```

### Ophalen overzicht taken

Onderstaand patroon schetst de volgorde van interactie tussen de verschillende systemen voor het ophalen van een overzicht van taken door een inwoner of ondernemer via een MijnOmgeving.

```mermaid
sequenceDiagram
    actor INW as Inwoner/Ondernemer
  	participant MO  as MijnOmgeving
   	participant TRC as Taak<br/>registratie<br/>component
    
    autonumber

    INW ->> MO: Inloggen
    MO ->> TRC: Ophalen taken
    TRC -->> MO: Taken
    MO ->> INW: Taken tonen
```

| Component | Toelichting |
| --- | --- |
| MijnOmgeving | Component dia via webtechnologie veilig toegang boedt tot persoonlijke informatie en gepersonaliseerde digitale dienstverlening. In deze context bevat de component zowel een frontend component als een backend for frontend component. |
| Taakregistratiecomponent | Dit component ondersteunt het opslaan en naar andere applicaties ontsluiten van taakgegevens (zowel externe taken t.b.v. de klant als interne taken t.b.v. de medewerker). De component slaat deze gestructureerd en voorzien van de benodigde metadata op en stelt applicaties in staat deze te wijzigen, te verwijderen en aan de hand van een aantal zoekcriteria op te vragen. |

| # | Toelichting |
| --- | --- |
| 1 | Dit is een toelichting |
| 2 | Dit is een toelichting |
| 3 | Dit is een toelichting |
| 4 | Dit is een toelichting |


## Attenderen

Attenderingen rond MijnTaken activeren de inwoner op het juiste moment om vertraging of termijnoverschrijding te voorkomen:

- **Nieuwe actie gevraagd:** zodra een handeling nodig is (bijvoorbeeld _"Aanvullende gegevens nodig voor uw aanvraag"_).
- **Naderende deadline:** herinnering wanneer een reactietermijn bijna afloopt.
- **Bevestiging van afronding:** attendering dat de ingezonden handeling is goedgekeurd of verwerkt.

De attendering bevat een duidelijke handelingsinstructie en deeplinkt direct naar het specifieke verzoek in het portaal.

## Gerelateerd

| Onderdeel           | Verwijzingen                                                                                                                                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Klantscenario's** | [Ontbrekende informatie aanleveren](../../scenarios/ontbrekende-informatie-aanleveren.md)                                                                                                                      |
| **Informatiemodellen** | [Gemeentelijke modellen](../../informatiemodellen.md#gemeentelijke-modellen)                                                                                                                             |

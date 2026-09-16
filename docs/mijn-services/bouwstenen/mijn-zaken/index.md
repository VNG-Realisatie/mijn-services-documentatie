---
sidebar_position: 2
description: >
  MijnZaken geeft kanaalonafhankelijk overzicht, uitleg en
  handelingsperspectief bij lopende en afgeronde dienstverlening.
sidebar_custom_props:
  icon: /img/mijn-services/icons/mijn-zaken.svg
---

# MijnZaken

:::info[MijnZaken is in ontwikkeling]

Deze pagina beschrijft een standaard die nog in ontwikkeling is. De inhoud kan
veranderen.

:::

MijnZaken brengt de context van een zaak samen: status, gebeurtenissen,
documenten, besluiten, contact en relevante vervolgstappen. De bouwsteen maakt
deze informatie begrijpelijk en bruikbaar, onafhankelijk van het kanaal of
onderliggende systeem.

## Doel

Het doel van MijnZaken is grip op de eigen dienstverlening: wat speelt er, wat
betekent het en wat is de volgende stap? De waarde ontstaat niet door zaakdata
te tonen, maar doordat een inwoner of ondernemer:

- begrijpen welke zaken lopen of zijn afgerond;
- herkennen waar een zaak over gaat;
- zien wat de actuele status betekent;
- terugvinden welke documenten, besluiten en contactmomenten erbij horen;
- weten wat de verwachte volgende stap is;
- weten of er zelf nog een actie nodig of mogelijk is.

Een inwoner bestuurt meestal niet het interne behandelproces, maar krijgt wel
overzicht, begrip en handelingsperspectief.

## Gebruikersbehoeften

MijnZaken ondersteunt drie soorten behoeften: weten, doen en zijn.

| Behoefte | Vraag van de gebruiker                              | Antwoord van MijnZaken                                                                                                         |
| :------- | :-------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| Weten    | Waar staat mijn zaak en wat betekent dat?           | Toon de actuele status, de tijdlijn, de relevante documenten, besluiten en contactmomenten in samenhang.                       |
| Doen     | Moet of kan ik nog iets doen?                       | Maak vervolgstappen zichtbaar in de context van de zaak, bijvoorbeeld aanvullen, reageren, betalen, uploaden of bezwaar maken. |
| Zijn     | Ben ik gezien en kan ik deze informatie vertrouwen? | Laat zien dat de zaak bekend is, waar informatie vandaan komt, hoe actueel die is en wat formeel of indicatief is.             |

De emotionele waarde is hierbij belangrijk. Statusinformatie is niet alleen een
feitelijke mededeling; het kan onzekerheid verminderen, vertrouwen vergroten en
onnodig contact voorkomen.

## Scope

MijnZaken beschrijft de interactie rond zaken en dienstverleningsprocessen. De
bouwsteen richt zich op de informatie die inwoners en ondernemers nodig hebben
om een zaak te kunnen volgen en begrijpen.

MijnZaken omvat:

- het tonen van lopende, afgeronde en conceptzaken;
- het herkennen en filteren van zaken;
- het tonen van de actuele status en statusgeschiedenis;
- het tonen van mijlpalen in inwonertaal;
- het tonen van documenten, besluiten en contactmomenten in de context van een
  zaak;
- het tonen van verwachte vervolgstappen of doorlooptijd wanneer deze
  beschikbaar zijn;
- het verbinden van relevante acties vanuit de zaakcontext.

Andere bouwstenen vullen MijnZaken aan:

- taken en acties worden uitgewerkt in MijnTaken;
- berichten en gesprekken worden uitgewerkt in MijnBerichten en MijnGesprekken;
- contactmomenten worden uitgewerkt in MijnContactmomenten;
- interne behandeling, workflow en bronregistratie blijven bij de organisatie
  die de zaak behandelt.

## Capabilities

De capabilities beschrijven wat MijnZaken als interactiebouwsteen mogelijk moet
maken. Ze zijn geformuleerd vanuit de waarde die de gebruiker ervaart.

| Capability                | Waarde voor de gebruiker                                                                    | Wat moet minimaal mogelijk zijn?                                                                                      |
| :------------------------ | :------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| Zaken vinden en herkennen | De gebruiker kan zaken terugvinden, onderscheiden en filteren op actualiteit en relevantie. | Per zaak is duidelijk waar die over gaat, om wat voor zaak het gaat, wat de stand is en wanneer er iets is veranderd. |
| Statusbetekenis tonen     | De gebruiker begrijpt wat de actuele status betekent.                                       | Interne statussen worden vertaald naar begrijpelijke statusgroepen, statusteksten en mijlpalen.                       |
| Zaakcontext samenbrengen  | De gebruiker ziet documenten, besluiten, contactmomenten en gebeurtenissen in samenhang.    | Relevante informatie uit verschillende bronnen komt samen rond de zaak.                                               |
| Vooruitblik geven         | De gebruiker weet wat de verwachte volgende stap of termijn is.                             | Waar mogelijk is zichtbaar wat de volgende stap is, wanneer iets verwacht wordt of wanneer een termijn afloopt.       |
| Handelen vanuit context   | De gebruiker ziet welke actie mogelijk of nodig is.                                         | Taken, acties of contactmogelijkheden zijn herkenbaar verbonden aan de zaak waarop ze betrekking hebben.              |
| Betrouwbaarheid duiden    | De gebruiker begrijpt hoe actueel, formeel en betrouwbaar informatie is.                    | Het is duidelijk waar informatie vandaan komt, hoe actueel die is en of die formeel of indicatief is.                 |

## Abstract interactiemodel

Het abstracte interactiemodel beschrijft welke interacties MijnZaken moet
ondersteunen. Deze interacties kunnen terugkomen in meerdere kanalen, zoals een
mijnomgeving, klantcontactcentrum of balie.

MijnZaken ondersteunt drie hoofdinteracties:

- lopende zaken overzien;
- afgeronde zaken terugvinden;
- de volledige context van een specifieke zaak begrijpen.

### Zaken overzien

Een inwoner of ondernemer wil in één oogopslag zien welke zaken lopen, welke
zijn afgerond en welke eventueel nog als concept bestaan.

Deze interactie helpt de gebruiker zaken herkennen en prioriteren. Daarvoor is
vooral informatie nodig die helpt om de juiste zaak te vinden:

- herkenbare titel of omschrijving;
- zaaktype of dienst;
- actuele statusgroep, bijvoorbeeld open, afgerond of concept;
- relevante datum, bijvoorbeeld registratiedatum, laatste wijziging of datum
  afgerond;
- resultaat, wanneer een zaak is afgerond;
- organisatienaam, wanneer de behandelende of leverende organisatie relevant is;
- eventueel een signaal dat actie nodig is;
- eventueel een eerstvolgende verwachte stap.

### Zaakcontext begrijpen

Een inwoner of ondernemer wil de volledige context van een zaak begrijpen: wat
is de huidige status, welke stappen zijn doorlopen, welke documenten en
besluiten horen erbij en welke contactmomenten zijn relevant?

MijnZaken componeert informatie uit meerdere bronnen tot één samenhangende
zaakcontext. De gebruiker hoeft daardoor niet zelf te zoeken in losse brieven,
berichten, documenten of contactgeschiedenis.

De zaakcontext kan bestaan uit:

- zaakgegevens zoals zaaknummer, omschrijving, zaaktype, status en resultaat;
- besluiten, documenten en bewijsstukken;
- contactmomenten die bij de zaak horen;
- gesprekken of berichten over de zaak;
- taken of acties die bij de zaak horen;
- betrokken partijen, zoals initiator, belanghebbende of behandelende
  organisatie.

### Vervolgstappen begrijpen

Een inwoner of ondernemer wil weten wat er nu gaat gebeuren of wat er zelf nog
moet gebeuren.

MijnZaken toont daarom, waar beschikbaar:

- de verwachte volgende mijlpaal;
- een indicatie van de doorlooptijd;
- acties die nog openstaan;
- acties die de gebruiker zelf kan starten;
- contactmogelijkheden in de context van de zaak.

### Formele informatie terugvinden

Een inwoner of ondernemer wil een ingediend document, ontvangen brief,
vergunning, besluit of bewijsstuk terugvinden.

MijnZaken toont formele informatie in de context van de zaak. Daardoor wordt
duidelijk welk document bij welke stap hoort, wat de status van het document is
en of het om een formeel besluit, een ingediend stuk of ondersteunende
informatie gaat.

### Betrouwbaarheid duiden

Een inwoner of ondernemer wil kunnen vertrouwen op de getoonde informatie.

MijnZaken maakt daarom, waar nodig, zichtbaar:

- wanneer informatie voor het laatst is bijgewerkt;
- uit welke bron of organisatie informatie komt;
- of een datum, status of vervolgstap formeel of indicatief is;
- wat de gebruiker kan doen als informatie ontbreekt of onduidelijk is.

### Uitzonderingssituaties

MijnZaken moet ook duidelijke interacties ondersteunen wanneer informatie niet
beschikbaar of niet compleet is.

Voorbeelden:

- er zijn geen zaken beschikbaar;
- een document is tijdelijk niet bereikbaar;
- een status is onbekend of nog niet vertaald;
- de verwachte doorlooptijd is niet beschikbaar;
- informatie uit een onderliggend systeem is vertraagd;
- de gebruiker heeft geen toegang tot een specifieke zaak.

In deze situaties is het belangrijk dat de gebruiker niet met technische
foutmeldingen wordt geconfronteerd, maar begrijpt wat er aan de hand is en wat
eventueel de volgende stap is.

## Begrippenlijst

MijnZaken gebruikt deze begrippen om informatie rond een dienstverleningsproces
te ordenen en in samenhang te tonen.

| Concept       | Betekenis voor MijnZaken                                                                                                            | Waarde voor de gebruiker                                                                          |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Zaak          | Het ankerpunt voor de informatie over een dienstverleningsproces.                                                                   | Brengt status, documenten, besluiten, contactmomenten en acties bij elkaar.                       |
| Zaaktype      | Het soort zaak of dienst, bijvoorbeeld parkeervergunning, bezwaar of melding openbare ruimte.                                       | Helpt de gebruiker zaken herkennen en onderscheiden, zeker wanneer meerdere zaken tegelijk lopen. |
| Status        | De actuele stand van de zaak, vertaald naar begrijpelijke taal.                                                                     | Maakt duidelijk waar de zaak staat en wat de status betekent.                                     |
| Resultaat     | De concrete uitkomst van een afgeronde zaak, bijvoorbeeld verleend, geweigerd, toegekend of afgewezen.                              | Laat zien hoe een zaak is geëindigd.                                                              |
| Besluit       | Een formele beslissing die bij de zaak hoort.                                                                                       | Maakt duidelijk welke formele uitkomst of rechtsgevolg bij de zaak hoort.                         |
| Document      | Een ingediend stuk, brief, bewijsstuk of ander informatieobject in de context van de zaak.                                          | Helpt de gebruiker stukken terugvinden en begrijpen bij welke stap ze horen.                      |
| Contactmoment | Een werkelijk contact tussen gebruiker en overheid over de zaak.                                                                    | Geeft overzicht over eerder contact en voorkomt dat informatie versnipperd raakt.                 |
| Gesprek       | Een digitale dialoog over de zaak.                                                                                                  | Geeft ruimte voor vragen, toelichting of afstemming in de context van de zaak.                    |
| Taak          | Een handeling die door de gebruiker of organisatie moet worden uitgevoerd in de context van de zaak.                                | Maakt zichtbaar of er nog iets moet gebeuren.                                                     |
| Product       | Wat uit de zaak voortkomt of aan de gebruiker wordt geleverd, bijvoorbeeld een vergunning, voorziening of ander herkenbaar product. | Verbindt het proces met wat de gebruiker uiteindelijk ontvangt of gebruikt.                       |
| Verzoek       | De oorspronkelijke vraag of aanspraak waarmee de zaak is gestart.                                                                   | Helpt verklaren waarom de zaak bestaat.                                                           |
| Partij        | De inwoner, ondernemer, organisatie of andere betrokkene bij de zaak.                                                               | Maakt zichtbaar wie betrokken is, bijvoorbeeld als initiator, belanghebbende of behandelaar.      |

Soms zijn ook achterliggende modelbegrippen relevant, zoals de organisatie of
organisatie-eenheid die een zaak behandelt, of een bredere samenhang waar een
zaak onderdeel van is. Voor de gebruiker telt vooral dat zichtbaar is wie de
zaak behandelt, wie betrokken is en waar de zaak bij hoort.

Voor overzichten kan een compacte zaakrepresentatie voldoende zijn. Voor een
zaakdetail is juist een samengestelde zaakcontext nodig, waarin status,
resultaat, documenten, contactmomenten, taken en betrokkenen in samenhang worden
getoond.

## Relatie met andere bouwstenen

MijnZaken staat niet op zichzelf. De bouwsteen componeert of verwijst naar
informatie uit andere MijnServices-bouwstenen.

| Bouwsteen           | Relatie met MijnZaken                                                   |
| :------------------ | :---------------------------------------------------------------------- |
| MijnTaken           | Openstaande acties worden in de context van een zaak zichtbaar gemaakt. |
| MijnBerichten       | Berichten kunnen aan een zaak gerelateerd zijn.                         |
| MijnContactmomenten | Contactgeschiedenis wordt in de zaakcontext getoond.                    |

## Gebruik in kanalen

De concrete presentatie van MijnZaken hoort bij de kanalen waarin de bouwsteen
wordt gebruikt. De eerste uitwerking staat bij
[kanaal: mijnomgeving](../../kanalen/mijn-omgeving).

## Aansluiten op bronnen en standaarden

Technische uitwerkingen beschrijven hoe MijnZaken wordt aangesloten op bronnen,
API's en bestaande standaarden.

- Algemene afspraken staan bij
  [architectuur en standaarden](../../architectuur-en-standaarden/).
- De koppeling met zaakgericht werken wordt uitgewerkt in het
  [aansluitprofiel ZGW API's](../../aansluitprofielen/zgw).

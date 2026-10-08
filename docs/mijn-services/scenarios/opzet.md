---
title: Opzet en Definition of Done voor scenario's
sidebar_label: Opzet en DoD
sidebar_position: 0.5
draft: true
---

# Opzet en Definition of Done voor scenario's

:::info[Werkdocument]
Deze afspraken beschrijven de eerste versie van het scenarioformaat.
Het scenario [Ontbrekende informatie aanleveren](./ontbrekende-informatie-aanleveren.md) is een eerste uitgewerkt voorbeeld.
:::

## Behoefte en scenario

Een **klantbehoefte** beschrijft waarom iemand iets wil weten of doen en wat
diegene wil bereiken. Een _job story_ uit de Jobs to Be Done-praktijk
(_Wanneer ..., wil ik ..., zodat ..._) kan helpen om die behoefte scherp te
krijgen. Het is een denksteun, geen verplicht format: formuleer de behoefte
uiteindelijk in natuurlijke taal.

Een **scenario** maakt die behoefte concreet: in welke situatie ontstaat ze,
wat probeert de gebruiker te bereiken, welke stappen volgen en wat is het
resultaat? De behoefte is de waarom; het scenario beschrijft de situatie en het
verloop. Alleen een handeling noemen, zoals "een document uploaden", maakt nog
niet duidelijk welke behoefte die handeling dient.

## BDD-achtig, in gewone taal

Een scenario mag BDD-achtig zijn zonder Gherkin te gebruiken. Beschrijf de
gebruiker, de situatie, wat diegene doet en wat diegene daardoor ziet of weet.
Zet concrete, waarneembare verwachtingen bij de relevante stap. Zo blijft het
gedrag toetsbaar en linkbaar, zonder elk scenario om te zetten in een lange
lijst met _Gegeven / Als / Dan_. Gebruik Gherkin alleen wanneer een regel of
uitzondering anders onvoldoende precies is.

Formuleer de behoefte in gewone taal en vermijd interne begrippen als _taak_
of _zaak_ wanneer gebruikers die niet vanzelfsprekend kennen. Gebruik in de
scenariotitel een korte, herkenbare werktitel. Zet de langere behoefte als
eerste alinea op de pagina; forceer niet de hele behoefte in een titel.

## Afbakening

Een scenario beschrijft een concrete situatie vanuit het perspectief van een
inwoner of ondernemer, met een expliciet gebruikersdoel. Het verloop laat zien
hoe die dat doel probeert te bereiken. Een stap gebruikt nul, een of meerdere bouwstenen.
Een schermprofiel is een mogelijke uitwerking, niet de definitie van de behoefte.
Contextstappen mogen buiten MijnServices vallen en hoeven geen scherm te hebben.

Een scenario is geen service blueprint, API-specificatie of volledige
beschrijving van het interne behandelproces. Functionele eisen blijven bij de
bouwsteen; schermannotaties koppelen die eisen aan API-operaties en DTO-velden.
Use cases beschrijven de ondersteunde gebruikersdoelen bij de bouwstenen.

## Opzet

| Onderdeel        | Inhoud                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Situatie en doel | Actor, aanleiding, gebruikersdoel, voorwaarden en scope.                                 |
| Verloop          | Stappen in gewone taal, met een stabiel anker per stap.                                  |
| Verwachtingen    | Waarneembare resultaten bij de relevante stappen; alternatieve situaties in gewone taal. |
| Resultaat        | Wat weet of heeft de gebruiker na afloop? Wat is juist niet veranderd?                   |

Schrijf vanuit de gebruiker en beschrijf ook informatiebehoeften en onzekerheid.
Niet iedere stap is een klik. Beschrijf portaalafhankelijke routes als varianten
wanneer ondersteuning verschilt; suggereer niet dat elk portaal dezelfde
schermen of uitvoeringsmogelijkheden heeft.

## Machineleesbaar contract

Het [JSON Schema](./scenario.schema.json) valideert het object `scenario` in de
YAML-frontmatter, niet de volledige Docusaurus-frontmatter of de Markdowntekst.
De tekst blijft leesbaar; tooling haalt relaties uitsluitend uit de metadata.

```yaml
scenario:
  version: 1
  id: SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN
  doel: De gevraagde informatie aanleveren zodat de behandeling van mijn aanvraag of melding verder kan.
  steps:
    id: informatie-aanleveren
    title: De gevraagde informatie aanleveren
    bouwstenen:
      - doc: mijn-services/bouwstenen/mijn-taken/index
        anchor: uc-02-taak-afhandelen
    schermen:
      - doc: mijn-services/schermprofielen/uitvoering/taak-uitvoeren
    verwachtingen:
      - id: aanlevering-bevestigd
        beschrijving: De inwoner krijgt bevestiging dat de informatie is ingediend.
```

| Veld            | Afspraak                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `version`       | Versie van het metadataformaat, momenteel `1`; niet de inhoudsversie van het scenario.                                          |
| `id`            | Uniek scenario-ID met prefix `SCN-`; blijft gelijk bij verplaatsen of herschrijven.                                             |
| `steps`         | Niet-lege lijst in de volgorde van het beschreven hoofdverloop.                                                                 |
| `steps[].id`    | Uniek binnen het scenario, stabiel en bruikbaar als pagina-anker. Een externe stapverwijzing gebruikt scenario-ID plus stap-ID. |
| `steps[].title` | Titel van de stap; moet overeenkomen met de kop in de tekst.                                                                    |
| `bouwstenen`    | Verplichte lijst met documentverwijzingen; `[]` voor een contextstap zonder bouwsteen.                                          |
| `schermen`      | Verplichte lijst met mogelijke schermuitwerkingen; `[]` als geen scherm van toepassing is.                                      |
| `doc`           | Docusaurus-document-ID relatief aan `docs/`, zonder extensie of begin-/eindslash. Gebruik geen URL of relatieve bestandspaden.  |
| `anchor`        | Optioneel bestaand anker in het doeldocument, zonder `#`; bij voorkeur de functionele interactie of schermannotatie.            |

De lijsten zijn meervoudig: een stap kan bouwstenen combineren en verschillende
schermuitwerkingen hebben. De hele-scenario-overzichten en terugverwijzingen
worden uit de stappen afgeleid; leg ze niet nogmaals in metadata vast.

`doel` legt het gebruikersdoel vast. `steps[].verwachtingen` bevat benoemde,
waarneembare resultaten met een `id` en `beschrijving`. Deze velden zijn optioneel
in het schema voor bestaande versie-1-documenten, maar worden gebruikt bij
nieuwe uitwerkingen. Verwachtings-ID's zijn uniek binnen het scenario en delen
de ankerruimte met stap-ID's; gebruik dus geen stap-ID als verwachtings-ID.
Een externe testverwijzing gebruikt scenario-ID, stap-ID en verwachtings-ID.

Onbekende metadatavelden zijn niet toegestaan. Een incompatibele wijziging
vereist een nieuwe formaatversie en een bewuste migratie van scenario's en tooling.
Gherkin is optioneel en alleen nuttig voor gedragsregels die precisie vragen.
Als het wordt gebruikt, staat het in codeblokken met taal `gherkin` en `# language: nl`.
Een Gherkin-stap is niet automatisch een scenariostap: gedragsvoorbeelden mogen
meerdere stappen of een alternatieve situatie beschrijven.

## Tekst en metadata synchroniseren

Gebruik voorlopig expliciete stapkoppen, zoals in het eerste scenario:

```html
<h3 id="taak-openen">Een taak openen</h3>
```

Metadata is de bron voor doel, volgorde, titels, relaties en verwachtingen.
Markdown is de bron voor het verhaal. Zolang er geen renderer is,
moeten doel, stapkoppen, verwachtingen en zichtbare verwijzingen handmatig
dezelfde informatie volgen. Geef zichtbare verwachtingen hun eigen anker.
Een toekomstige renderer kan koppen en relatieblokken uit de metadata tonen,
zonder de beschrijving te genereren of Markdownbestanden te herschrijven.

## Validatie

Formalisering bestaat uit drie verschillende controles:

1. **Structuur:** JSON Schema controleert types, verplichte velden en ID-formaten.
2. **Referenties:** een validator controleert unieke scenario-/stap-ID's,
   bestaande doeldocumenten en ankers, en overeenkomende stapkoppen en volgorde.
3. **Betekenis:** review controleert of verhaal, functionele eisen en
   gedragsvoorbeelden inhoudelijk overeenkomen. Een parser kan dat niet bewijzen.

Het schema staat al in deze repository. Automatische referentievalidatie,
rendering en terugverwijzingen zijn nog niet geimplementeerd.
Machineleesbaarheid maakt de voorbeelden niet automatisch uitvoerbare tests:
daarvoor zijn concrete assertions en een testomgeving nodig.

## Koppeling met tests

Een Playwright-test kan naar het scenario, de stap en een verwachting verwijzen.
Selectors, klikcommando's en testdata blijven in de portaalgebonden testcode,
niet in het scenario. Verschillende portalen kunnen dezelfde verwachting met
verschillende tests afdekken. Deze koppeling is nog niet geimplementeerd.

Een test kan vaststellen dat een toelichting zichtbaar is, maar niet bewijzen
dat een inwoner haar begrijpt. Het gebruikersdoel en het toetsbare portaalgedrag
zijn daarom bewust niet hetzelfde; begrijpelijkheid vraagt ook gebruikersonderzoek.

## Definition of Done

- [ ] De klantbehoefte (waarom) en het concrete scenario (situatie, verloop en resultaat) zijn van elkaar te onderscheiden.
- [ ] De behoefte en scenariotitel zijn in herkenbare taal geformuleerd, zonder onnodige interne begrippen.
- [ ] Actor, aanleiding, voorwaarden en scope zijn duidelijk.
- [ ] Het verloop en het resultaat zijn begrijpelijk zonder kennis van API's.
- [ ] Elke stap heeft een stabiel ID en een beschrijving van de gebruikersbehoefte of handeling.
- [ ] Bouwsteenverwijzingen wijzen waar mogelijk naar de relevante functionele interactie.
- [ ] Schermverwijzingen zijn concreet en verwijzen waar mogelijk naar annotaties.
- [ ] Contextstappen en relevante portaalvarianten zijn expliciet herkenbaar.
- [ ] Relevante stappen hebben benoemde, toetsbare verwachtingen met stabiele ID's; relevante uitzonderingen zijn leesbaar uitgewerkt. Gherkin is niet verplicht.
- [ ] Metadata voldoet aan het schema; ID's, verwijzingen, stapkoppen en volgorde zijn gecontroleerd.
- [ ] API-contracten en functionele eisen zijn niet opnieuw gedefinieerd in het scenario.
- [ ] Verhaal en gedragsvoorbeelden zijn inhoudelijk gereviewd.
- [ ] Publicatiestatus is bewust gekozen: `draft: true` blijft lokaal zichtbaar, maar wordt niet gepubliceerd in een productiebuild.

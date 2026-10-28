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

## Gedeeld documentatiemodel

De machineleesbare bron staat onder `docs/mijn-services/_model/`, niet in de
frontmatter van scenariopagina's. Het eerdere `scenario`-frontmattercontract en
het bijbehorende JSON Schema zijn vervallen.

- `klantscenarios.behoeften` bevat de klantbehoeften met stabiele ID's.
- `klantscenarios.scenarios` verbindt een scenario met een behoefte, doel, document en stappen.
- `usecases` registreert de functionele interacties bij hun bouwsteen.

Dit zijn onderdelen van het samengevoegde model, geen bestandsnamen. Behoeften
en scenario's worden nu samen beheerd in `scenarios.yaml`; bouwstenen en use cases
in `bouwstenen.yaml`. Alle YAML-bijdragen worden samengevoegd, zodat deze indeling
later kan veranderen zonder verwijzingen aan te passen.

Een stap verwijst naar use-case-ID's, eventueel aanvullende bouwsteen-ID's en
mogelijke schermuitwerkingen. Gebruik geen kopie van een use-casebeschrijving.
Een contextstap kan lege verwijzingslijsten hebben. De hele-scenario-overzichten
en terugverwijzingen worden uit de stappen afgeleid, niet apart onderhouden.

Scenario-ID's behouden de prefix `SCN-` en blijven gelijk bij verplaatsen of
herschrijven. Stap-ID's zijn uniek binnen een scenario en vormen de pagina-ankers.
Verwachtingen hebben een `id` en `beschrijving` en delen de ankerruimte met stappen.
Een externe testverwijzing gebruikt scenario-ID, stap-ID en verwachtings-ID.

Schermverwijzingen gebruiken `document`: een Docusaurus-document-ID relatief aan
`docs/`, zonder extensie of begin-/eindslash. `anker` is optioneel en bevat geen `#`.
De volledige beheerafspraken en voorbeelden staan in de README van de modelmap.

## Tekst en model verbinden

De YAML-bronnen beheren behoefte, doel, stapnamen, verwachtingen en relaties.
Markdown beheert het verhaal, de context en de toelichting. Alleen pagina- en
publicatiegegevens blijven in frontmatter staan.

```mdx
import { ScenarioDoel, ScenarioStap } from "../_model/Scenario";

<ScenarioDoel scenario="SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN" />

<ScenarioStap scenario="SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN" stap="informatie-aanleveren">

De inwoner levert de gevraagde informatie aan.

</ScenarioStap>
```

De componenten tonen de doeltekst, stapkop, verwachtingen en verwijzingen vanuit
het model. Schrijf die informatie niet nogmaals in Markdown. De pagina plaatst de
stappen expliciet; de modeltest controleert selectie en volgorde.

Gherkin blijft optioneel voor gedragsregels die precisie vragen. Gebruik daarbij
taal `gherkin` en `# language: nl`. Een gedragsvoorbeeld kan meerdere stappen of
een alternatieve situatie beschrijven en is niet automatisch een scenariostap.

## Validatie

Voer vanuit de repository-root de gerichte controles uit:

```sh
node --test docs/mijn-services/_model/model.test.cjs
```

De YAML-parser weigert dubbele sleutels. De leeslaag controleert interne
verwijzingen en unieke stap-/verwachtingsankers; de tests controleren ook
stapselectie, volgorde en bestaande schermdocumenten. De weergave gebruikt de
Docusaurus-documentroutes.

Een volledig structuurschema en automatische controle van alle doelankers zijn
nog niet beschikbaar. Inhoudelijke review blijft nodig om te controleren of
verhaal, functionele eisen en gedragsvoorbeelden overeenkomen. Machineleesbaarheid
maakt de scenario's niet automatisch uitvoerbare portaaltests: daarvoor zijn
concrete assertions en een testomgeving nodig.

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
- [ ] Het gedeelde model is de bron voor gestructureerde gegevens; ID's, verwijzingen, stapkoppen en volgorde zijn gecontroleerd.
- [ ] API-contracten en functionele eisen zijn niet opnieuw gedefinieerd in het scenario.
- [ ] Verhaal en gedragsvoorbeelden zijn inhoudelijk gereviewd.
- [ ] Publicatiestatus is bewust gekozen: `draft: true` blijft lokaal zichtbaar, maar wordt niet gepubliceerd in een productiebuild.

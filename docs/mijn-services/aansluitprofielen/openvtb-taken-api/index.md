---
sidebar_label: OpenVTB Taken API
---

# Aansluitprofiel OpenVTB Taken API

:::info[Werkversie]

Dit aansluitprofiel is een eerste uitwerking voor taken. Het profiel beschrijft
hoe MijnServices kan aansluiten op de OpenVTB Taken API als bron voor taken in
de InteractieServices API.

:::

De OpenVTB Taken API kan worden gebruikt als bron voor taken die in MijnServices
worden getoond of afgehandeld. De bron-API blijft verantwoordelijk voor de
uitvoering en registratie van taken; de InteractieServices API biedt het
uniforme contract richting kanalen.

## Single source of truth

Voor versie `v0.1` zijn de artefacten:

- [`v0.1/openapi.yaml`](./v0.1/openapi.yaml): snapshot van de bron-API.
- [`v0.1/arazzo.yaml`](./v0.1/arazzo.yaml): workflowmapping tussen de bron-API
  en de InteractieServices API.

Arazzo is de single source of truth voor de workflow: welke bronoperaties nodig
zijn, welke functionele flow wordt ondersteund en welke bronwaarden doelvelden
vullen. Aanvullende mappings houden we zo beperkt mogelijk en leggen we alleen
vast in het Arazzo-bestand als ze nodig zijn voor het mappingoverzicht.

DTO's worden niet in het aansluitprofiel opnieuw gedefinieerd. De doelstructuur
staat in de InteractieServices API; de bronstructuur staat in de OpenVTB Taken
API.

De InteractieServices API-documentatie blijft daarmee de plek voor het publieke
API-contract en de pluginweergave van operaties en DTO's. Het aansluitprofiel is
de plek voor de afgeleide documentatie: mappings, sequences, transformaties,
openstaande ontwerpvragen en issues die ontstaan bij het koppelen van een of
meer bron-API's aan dat contract.

## Workflowkeuze

Voor MijnServices is de generieke `externetaken`-resource het primaire
aansluitpunt. De detailresponse is polymorf: het veld `taakSoort` bepaalt of de
taak een betaaltaak, urltaak of formuliertaak is.

Daarom gebruikt de flow `mijnTaken.taakRaadplegen` in Arazzo één primaire
workflow: `openvtbTakenApi.raadpleegTaak`, gebaseerd op `externetakenRetrieve`.
De specifieke endpoints voor betaal-, formulier- en urltaken zijn daarmee geen
losse alternatieve workflows voor MijnServices, maar bron-specifieke varianten
die via de generieke response worden onderscheiden.

`isGerelateerdAan` bevat een lijst met contextrelaties. Elke relatie heeft een
`urn` naar bijvoorbeeld een zaak of product. In de mapping wordt daarom
`isGerelateerdAan[0].urn` gebruikt voor `taak.context.urn`.

## Cross-API stappen

Niet elke handeling die bij een taak hoort, hoeft door de OpenVTB Taken API zelf
te worden uitgevoerd. Als een taak bijvoorbeeld vraagt om een document te
uploaden of te registreren, kan de uitvoerende call bij een andere bron-API
liggen, zoals de ZGW Documenten API.

In dat geval blijft de OpenVTB Taken API de bron voor de taak en de context,
maar beschrijft Arazzo een workflow met meerdere `sourceDescriptions`:
bijvoorbeeld OpenVTB Taken API voor `externetakenRetrieve` en ZGW Documenten API
voor de documentoperatie. De workflow maakt dan expliciet welke gegevens uit de
taak nodig zijn om de vervolgstap bij de andere API uit te voeren.

Wanneer voor een takenflow aanvullende bronfamilies nodig zijn, zoals ZGW voor
zaken, documenten of besluiten, documenteren we die niet als onderdeel van de
InteractieServices API zelf. Ze horen bij het aansluitprofiel dat de flow
realiseert en, zodra meerdere profielen samen nodig zijn, bij het
[combinatieoverzicht](../combinaties). De Arazzo-workflow benoemt de betrokken
bronnen via `sourceDescriptions`; de gegenereerde profieltekst maakt vervolgens
zichtbaar welke bron welke rol heeft, welke volgorde van calls nodig is en welke
velden of besluiten nog niet eenduidig te mappen zijn.

## Tooling

De eerste workflows worden handmatig uitgewerkt in Arazzo, zodat de
mappingconventies zichtbaar kunnen groeien. Zodra de patronen stabiel zijn, ligt
de volgende tooling voor de hand:

- valideren dat elke `x-mijnservices-flowId` bestaat in het functioneel model;
- valideren dat elke `x-mijnservices-targetOperationId` bestaat in de
  InteractieServices API;
- valideren dat elke gebruikte `operationId` bestaat in de OpenVTB Taken API;
- genereren van een mappingoverzicht uit `arazzo.yaml` per flow, source
  operation en doeloperatie;
- genereren van een compleetheidsoverzicht per aansluitprofiel of combinatie van
  aansluitprofielen;
- tonen welke velden een transformatie nodig hebben, bijvoorbeeld van `date`
  naar `date-time`;
- later bundelen van meerdere Arazzo-bestanden tot een overkoepelend
  aansluitprofielenoverzicht.

Een generator of validator gebruikt `v0.1/arazzo.yaml` als workflowbasis. Vanuit
Arazzo volgt de generator de `sourceDescriptions` naar het functioneel model, de
InteractieServices API en de bron-API.

De harde checks en generatoren horen in de aparte MijnServices-bronrepo. Deze
publicatierepo bevat alleen de gepubliceerde content en artefacten. De eerste
check in die bronrepo bewaakt referentiele integriteit: Arazzo-profielen mogen
niet verwijzen naar onbekende flowIds, target operationIds, source-bestanden,
step operationIds, component-contexts of step outputs. Daarna kan dezelfde basis
worden uitgebreid met semantische checks voor velddekking, verplichte
doelattributen, transformaties en compleetheid per profiel of profielcombinatie.

## Mappingoverzicht

Het mappingoverzicht wordt gegenereerd uit Arazzo. Arazzo levert per workflow de
bronoperaties, step outputs en doelvelden. Step outputs halen de bronwaarden op;
workflow outputs gebruiken dot-notatie voor doelvelden, zoals `taak.titel.nl` en
`taak.context.urn`.

Voorbeeld: bronveld `status` wordt step output `taakStatus` en vult doelveld
`taak.status`. Omdat OpenVTB fijnmaziger statuswaarden gebruikt, staat de
waardemapping als herbruikbare profiel-extensie in `arazzo.yaml`.

Voor `mijnTaken.taakRaadplegen` betekent dit dat alle `taak.*` outputs worden
vergeleken met het schema van `interactieservicesApi.retrieveTaak`.

Naast de expliciete mapping moet het overzicht ook verschillen zichtbaar maken:

- **Gemapte attributen:** bronattributen die via Arazzo worden gebruikt om een
  veld in de InteractieServices API te vullen.
- **Transformaties:** mappings waarbij type, formaat of betekenis niet
  een-op-een overeenkomt. Voor `deadline` levert OpenVTB bijvoorbeeld
  `einddatumHandelingsTermijn` als `date`, terwijl de InteractieServices API een
  `date-time` verwacht.
- **Ongebruikte bronattributen:** attributen die wel terugkomen uit de OpenVTB
  Taken API, maar niet in de InteractieServices API terechtkomen.
- **Niet-gevulde doelattributen:** attributen die de InteractieServices API wel
  kan vragen of teruggeven, maar waarvoor dit aansluitprofiel nog geen bronveld
  of transformatie aanwijst.

Zo wordt zichtbaar of een aansluitprofiel informatie verliest, waar de
InteractieServices API ruimer is dan de bron-API en welke mappings nog ontwerp-
of besluitwerk vragen.

## Compleetheid

Met dezelfde informatie kan de generator per aansluitprofiel bepalen hoe
compleet de aansluiting is voor een flow of doeloperatie. Een profiel is niet
alleen compleet wanneer alle doelvelden technisch gevuld zijn, maar ook wanneer
de noodzakelijke broncalls, waardemappings, transformaties en open keuzes
expliciet zijn gemaakt.

Voor combinaties van aansluitprofielen geldt hetzelfde principe op flow-niveau.
Als een taakflow bijvoorbeeld OpenVTB gebruikt voor de taak en ZGW voor zaken of
documenten, ontstaat het compleetheidsbeeld uit de gezamenlijke
Arazzo-workflows: welke doelvelden worden door welke bron gevuld, welke sequence
is nodig en welke velden blijven ongemapt, conditioneel of afhankelijk van
lokale keuzes.

Het gegenereerde overzicht kan daarom per flow onderscheid maken tussen:

- **Compleet:** alle verplichte doelvelden en noodzakelijke sequence-stappen
  zijn gemapt of bewust constant/afgeleid ingevuld.
- **Deels compleet:** de hoofdflow werkt, maar optionele velden, bronvarianten
  of aanvullende acties vragen nog uitwerking.
- **Niet compleet:** verplichte doelvelden, bronoperaties of transformaties
  ontbreken nog.
- **Niet leverbaar:** het doelveld of de stap kan met deze bron of combinatie
  van bronnen niet worden geleverd.

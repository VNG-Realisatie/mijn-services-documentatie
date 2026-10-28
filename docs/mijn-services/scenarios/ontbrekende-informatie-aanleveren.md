---
sidebar_position: 1
draft: true
description: Een inwoner begrijpt welk aanvullend materiaal nodig is en levert dat aan zodat de behandeling verder kan.
---

import {ScenarioDoel, ScenarioStap, UsecaseLink, SchermLink} from '../\_model/Scenario';

# Ontbrekende informatie aanleveren

<ScenarioDoel scenario="SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN" />

## Situatie

Een inwoner heeft een aanvraag of melding gedaan. De behandelende organisatie
heeft aanvullende informatie nodig. De inwoner wordt gevraagd die aan te leveren en wil
weten welke informatie nodig is, bij welke aanvraag of melding die hoort en
hoe die deze kan aanleveren.

De inwoner mag de betreffende aanvraag of melding inzien en de gevraagde
informatie aanleveren. In de hier uitgewerkte online variant is de inwoner
ingelogd. Afhankelijk van de dienstverlening kan aanleveren ook aan de balie,
eventueel met ondersteuning van een medewerker.

Dit scenario beschrijft de behoefte, niet een specifieke portaalroute. Online
kan aanleveren in hetzelfde portaal of via een andere uitvoeringsomgeving.

## Verloop

<ScenarioStap scenario="SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN" stap="informatiebehoefte-begrijpen"
onlineUitwerking={<>De vraag kan als taak worden getoond. Die kan bij de aanvraag staan in <SchermLink document="mijn-services/schermprofielen/context/taken-in-context">Taken in context</SchermLink>, of worden gevonden via het <SchermLink document="mijn-services/schermprofielen/overzicht/takenoverzicht">Takenoverzicht</SchermLink>.</>}

>

De inwoner krijgt de vraag om aanvullende informatie aan te leveren en wil
begrijpen wat er ontbreekt. Bij welke aanvraag of melding hoort de vraag, welke
informatie of documenten zijn nodig en wanneer moeten die zijn aangeleverd?

Via <UsecaseLink id="zaakstatus-volgen" /> kan de inwoner de voortgang van de
aanvraag of melding volgen en zien of er een actie openstaat. Met
<UsecaseLink id="taken-raadplegen" /> kan de inwoner vervolgens bekijken wat er wordt
gevraagd en wanneer de informatie moet worden aangeleverd.

</ScenarioStap>

<ScenarioStap scenario="SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN" stap="informatie-aanleveren"
onlineUitwerking={<>Een mogelijke uitwerking is <SchermLink document="mijn-services/schermprofielen/uitvoering/taak-uitvoeren">Taak uitvoeren</SchermLink>.</>}

>

De inwoner levert de gevraagde informatie aan via de mogelijkheid die voor dit
doel beschikbaar is. Dat kan in hetzelfde portaal, maar ook via een andere
omgeving. Na het indienen weet de inwoner of de informatie is ontvangen en wat
er daarna gebeurt.

Dit wordt ondersteund door <UsecaseLink id="taak-afhandelen" />: de inwoner
voert de gevraagde handeling uit, krijgt een bevestiging en weet wat het vervolg is.

</ScenarioStap>

## Resultaat

De inwoner weet welke informatie nodig was en heeft die ingediend. De inwoner
heeft een bevestiging ontvangen of op een andere manier begrepen dat de taak
succesvol is uitgevoerd en weet of er nog een vervolgstap nodig is.

Het succesvol uitvoeren van de taak betekent niet automatisch dat de informatie
al is beoordeeld of dat de aanvraag of melding is afgerond.

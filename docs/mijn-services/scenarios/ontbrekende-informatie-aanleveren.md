---
sidebar_position: 1
draft: true
description: Een inwoner begrijpt welk aanvullend materiaal nodig is en levert dat aan zodat de behandeling verder kan.
scenario:
  version: 1
  id: SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN
  doel: De gevraagde informatie aanleveren zodat de behandeling van mijn aanvraag of melding verder kan.
  steps:
    - id: verzoek-bekijken
      title: Het verzoek bekijken
      bouwstenen:
        - doc: mijn-services/bouwstenen/mijn-taken/index
          anchor: uc-01-taken-raadplegen
        - doc: mijn-services/bouwstenen/mijn-zaken/index
      schermen:
        - doc: mijn-services/schermprofielen/overzicht/takenoverzicht
        - doc: mijn-services/schermprofielen/context/taken-in-context
          anchor: annotatie-c2
      verwachtingen:
        - id: verzoek-herkenbaar
          beschrijving: De inwoner kan herkennen bij welke aanvraag of melding het verzoek hoort.
        - id: gevraagde-informatie-duidelijk
          beschrijving: Het is duidelijk welke informatie of documenten nodig zijn en voor wanneer.
    - id: informatie-aanleveren
      title: De gevraagde informatie aanleveren
      bouwstenen:
        - doc: mijn-services/bouwstenen/mijn-taken/index
          anchor: uc-02-taak-afhandelen
      schermen:
        - doc: mijn-services/schermprofielen/uitvoering/taak-uitvoeren
      verwachtingen:
        - id: aanlevering-bevestigd
          beschrijving: De inwoner krijgt bevestiging dat de informatie is ingediend.
        - id: vervolgstatus-duidelijk
          beschrijving: Het is duidelijk of er nog actie nodig is of dat de informatie wordt beoordeeld.
---

# Ontbrekende informatie aanleveren

De overheid heeft meer informatie nodig om mijn aanvraag of melding verder te
behandelen. Ik wil begrijpen wat ontbreekt en hoe ik dit kan aanleveren.

## Situatie

Een inwoner heeft een aanvraag of melding gedaan. De behandelende organisatie
heeft aanvullende informatie nodig. De inwoner ontvangt het verzoek en wil
weten welke informatie nodig is, bij welke aanvraag of melding die hoort en
hoe die deze kan aanleveren.

De inwoner is ingelogd en mag de aanvraag of melding bekijken. Dit scenario
beschrijft de behoefte, niet een specifieke portaalroute. Aanleveren kan in
hetzelfde portaal of via een andere uitvoeringsomgeving.

## Verloop

<h3 id="verzoek-bekijken">Het verzoek bekijken</h3>

De inwoner opent het verzoek en bekijkt de toelichting en de bijbehorende
aanvraag of melding. De inwoner ziet welke informatie nodig is en, als er een
termijn geldt, wanneer die uiterlijk moet worden aangeleverd.

<p id="verzoek-herkenbaar"><strong>Verwachting:</strong> De inwoner kan herkennen bij welke aanvraag of melding het verzoek hoort.</p>

<p id="gevraagde-informatie-duidelijk"><strong>Verwachting:</strong> Het is duidelijk welke informatie of documenten nodig zijn en voor wanneer.</p>

<details>
<summary>Gekoppelde bouwstenen en schermen</summary>

Dit raakt [MijnTaken](../bouwstenen/mijn-taken/index.md#uc-01-taken-raadplegen)
en de context van [MijnZaken](../bouwstenen/mijn-zaken/index.md). Mogelijke
schermuitwerkingen zijn [Taken in context](../schermprofielen/context/taken-in-context.mdx)
en het [takenoverzicht](../schermprofielen/overzicht/takenoverzicht.mdx).

</details>

<h3 id="informatie-aanleveren">De gevraagde informatie aanleveren</h3>

De inwoner levert de gevraagde informatie aan via de mogelijkheid die voor dit
verzoek beschikbaar is. Dat kan in hetzelfde portaal, maar ook via een andere
omgeving. Na het indienen weet de inwoner of de informatie is ontvangen en wat
er daarna gebeurt.

<p id="aanlevering-bevestigd"><strong>Verwachting:</strong> De inwoner krijgt bevestiging dat de informatie is ingediend.</p>

<p id="vervolgstatus-duidelijk"><strong>Verwachting:</strong> Het is duidelijk of er nog actie nodig is of dat de informatie wordt beoordeeld.</p>

<details>
<summary>Gekoppelde bouwsteen en scherm</summary>

Dit gebruikt [Taak afhandelen in MijnTaken](../bouwstenen/mijn-taken/index.md#uc-02-taak-afhandelen).
Een mogelijke schermuitwerking is [Taak uitvoeren](../schermprofielen/uitvoering/taak-uitvoeren.md).

</details>

## Resultaat

De inwoner weet welke informatie nodig was, heeft die ingediend en weet of er
nog een vervolgstap nodig is. Het indienen van informatie betekent niet
automatisch dat die al is beoordeeld of dat de aanvraag of melding is afgerond.

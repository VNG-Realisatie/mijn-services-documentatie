---
sidebar_position: 1
---

# Portaalwissels

Een inwoner of ondernemer kan dezelfde dienstverlening tegenkomen in
verschillende portalen, bijvoorbeeld MijnOverheid en de mijnomgeving van een
gemeente of uitvoeringsorganisatie. De gebruiker wil weten wat er speelt en
hoe die verder kan, zonder de verdeling tussen organisaties en systemen te
hoeven kennen.

De Interactie API biedt een gemeenschappelijk contract voor de informatie en
handelingsmogelijkheden die portalen daarvoor nodig hebben. Het contract staat
los van een specifiek portaal: de betekenis van de informatie blijft gelijk,
terwijl presentatie en ondersteunde uitvoering per portaal kunnen verschillen.

## Dezelfde informatie, verschillende mogelijkheden

Een portaal gebruikt de beschikbare informatie om een overzicht, context of
vervolgstap te tonen. Niet ieder portaal hoeft elke handeling zelf te kunnen
uitvoeren. Bij taken kan een portaal bijvoorbeeld het verzoek tonen en de
gebruiker laten doorgaan naar de omgeving waar de handeling beschikbaar is.

| Situatie                                           | Wat het portaal doet                                                                            |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Het portaal ondersteunt de uitvoering              | Biedt de handeling lokaal aan, als de benodigde uitvoeringsinformatie beschikbaar is.           |
| Het portaal ondersteunt de uitvoering niet         | Verwijst naar de uitvoerlocatie die bij de taak wordt aangeboden.                               |
| Het portaal herkent een nieuw uitvoeringstype niet | Valt terug op de aangeboden verwijzing, in plaats van een niet-ondersteunde handeling te tonen. |

Zo kunnen portalen en aanbieders onafhankelijk groeien. Het ene portaal kan
meer ondersteunen dan het andere, zonder dat het gebruikersdoel verandert.
De precieze contractafspraken en het terugvalgedrag staan in de
[API-referentie](./referentie/interactieservices-api).

## Verdergaan in een ander portaal

Een portaalwissel is een mogelijke route, geen verplicht onderdeel van iedere
interactie. Wanneer de gebruiker in een andere omgeving verdergaat, moet
duidelijk blijven bij welk verzoek of welke dienstverlening de handeling hoort.
De bestemming moet de benodigde uitvoering ondersteunen. Eventuele
authenticatie en terugkeer zijn onderdeel van de concrete portaaluitwerking.

Na een handeling wil de gebruiker weten of die is gelukt en of er nog iets
nodig is. Een terugkeer naar het oorspronkelijke portaal is op zichzelf geen
bewijs van afronding. De actuele informatie van de verantwoordelijke aanbieder
bepaalt welke status het portaal kan tonen.

## Wat de Interactie API wel en niet bepaalt

De API beschrijft welke informatie en mogelijkheden een portaal kan opvragen.
Ze schrijft geen gezamenlijke gebruikersinterface voor en neemt de uitvoering
of het interne behandelproces van de verantwoordelijke organisatie niet over.
Een aangeboden uitvoeringsmogelijkheid kan in een portaal worden gepresenteerd,
terwijl de verwerking bij die organisatie blijft.

Schermprofielen maken de mogelijke routes concreet. Scenario's laten zien hoe
een gebruiker daarin een doel probeert te bereiken.

## Gerelateerd

| Onderdeel       | Verwijzing                                                      |
| --------------- | --------------------------------------------------------------- |
| API-contract    | [Interactie API](./index.md)                                    |
| Portaalroutes   | [Procesoverzicht](./procesoverzicht.md)                         |
| Schermprofielen | [Overzicht, context en uitvoering](../schermprofielen/index.md) |

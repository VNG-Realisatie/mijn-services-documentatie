---
sidebar_position: 3
---

# Uitgangspunten

:::warning[In ontwikkeling]
Dit document is nog in ontwikkeling en kan wijzigen.
:::

Dit document beschrijft de uitwerking van de [principes uit de API-introductie](/api/mijntaken-api): hoe het contract zich gedraagt, welke afwegingen ten grondslag liggen aan de structuur van het `Taak`-object, en welke scenario's een portaal kan ondersteunen.

## Uitwerking

### Additief model en groeipad

Compatibility wordt gerealiseerd via een additief model: de response bevat alle beschikbare velden, en het portaal gebruikt wat het ondersteunt. Er is geen handshake vooraf waarbij capabilities worden uitgewisseld. Portalen gaan robuust om met onbekende velden en vallen terug op een basisvariant als een optie ontbreekt.

Dit maakt een **groeipad** mogelijk in beide richtingen: een portaal bepaalt zelf welke scenario's het ondersteunt, en een provider bepaalt zelf welke data het meelevert. MijnOverheid begint bijvoorbeeld met doorsturen naar een ander portaal, documentupload en betaling — en een oudere provider levert misschien alleen een canonical URL en geen formulierdefinities. Beide groeien in hun eigen tempo, en het werkt altijd: het portaal valt terug op wat de provider aanbiedt, de provider hoeft niet te weten wat het portaal aankan.

### Canonical URL

Elke taak heeft een **canonical URL**: de stabiele, publieke URL waarmee een eindgebruiker de taak kan bekijken in een browser. Dit is niet de API-URL. De canonical URL wordt bepaald door de provider.

Een portaal vergelijkt de canonical URL met zijn eigen domein om te bepalen of de taak lokaal geopend kan worden, of dat de gebruiker wordt doorgestuurd naar een ander portaal (**portaalwissel**).

### Presentatiescenarios

De API biedt drie niveaus van rijkheid aan, bepaald door `uitvoering.type` en `uitvoering.definitie`. Een portaal kiest per taak het hoogste niveau dat het ondersteunt en valt anders terug — `canonicalUrl` is altijd aanwezig als fallback.

| Niveau | Scenario                | API-signaal                                                          | Gedrag van het portaal                                                                                                  |
| ------ | ----------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **1**  | **Portaalwissel**       | `type` afwezig of onbekend                                           | Toont een generieke „Uitvoeren”-knop; klik leidt via `canonicalUrl` naar de provider. De gebruiker verlaat het portaal. |
| **2**  | **Type-specifieke CTA** | `type` herkend (bijv. `betaling`), `definitie` afwezig               | Toont een type-specifieke CTA (bijv. „Betalen”); klik leidt via `canonicalUrl` naar de provider.                        |
| **3**  | **Lokale uitvoering**   | `type` herkend, `definitie` aanwezig (alleen op `GET /taken/{uuid}`) | Rendert de uitvoering lokaal (bijv. uploadformulier of formulierdefinitie); submit gaat naar `definitie.endpoint`.      |

Daarnaast tonen alle portalen taken in een **lijst- of kaartweergave** op basis van `TaakSamenvatting` (`POST /taken/zoek`). Dat is geen apart scenario maar een gegeven: elk portaal dat de API gebruikt, doet dit.

:::note
Niveau 3 stelt ook eisen aan het portaal van de provider zelf: als een gebruiker via een portaalwissel (niveau 1 of 2) bij een ander portaal terechtkomt, moet dat portaal de taak zelf volledig kunnen afhandelen — anders belandt de gebruiker in een doodlopende weg.
:::

#### Transiente statusfeedback na redirect

Bij niveau 1 en 2 verlaat de gebruiker tijdelijk het portaal. Bij terugkeer kan de provider een statusparameter meegeven in de return-URL — bijvoorbeeld `?status=betaald`. Het portaal mag deze parameter gebruiken voor **directe UX-feedback** (zoals een succesmelding) zonder te wachten op een API-poll.

Dit is geen schending van principe 3 (_uitvoering bij de provider_): het portaal slaat de statuswaarde niet op en gebruikt hem uitsluitend voor transiente weergave. De werkelijke statuswissel blijft eigendom van de provider. Het portaal herlaadt vervolgens de taak via de API om de actuele toestand te tonen.

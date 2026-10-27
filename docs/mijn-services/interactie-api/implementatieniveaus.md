---
draft: true
sidebar_position: 0
---

# Implementatieniveaus

De Interactie API is ontworpen volgens een **additief model**: de API biedt rijke informatie aan, maar dwingt niet af dat elk portaal of kanaal meteen alles ondersteunt. Een portaal bepaalt zelf op welk niveau het een module implementeert, en kan dat per taak- of contexttype variëren.

## De twee assen van de Interactie API

1. **Functionele breedte (Modules):** Welke modules implementeert een organisatie? _(bv. Kernmodule, Taken, en later Zaken)_.
2. **Interactiediepte (Implementatieniveau):** Hoe diep integreert het kanaal de uitvoering van die modules? _(van eenvoudige doorverwijzing tot volledige in-app interactie)_.

---

## De drie implementatieniveaus

Het contract ondersteunt drie niveaus van interactiediepte. Een portaal kiest per item het hoogste niveau dat het technisch kan of wil ondersteunen:

| Niveau       | Omschrijving                         | Wat de API levert                                    | Gedrag van het portaal                                                                                                                                     |
| :----------- | :----------------------------------- | :--------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Niveau 1** | **Verwijzen (Portaalwissel / Link)** | Alleen basisgegevens; `type` onbekend of afwezig     | Toont een generieke actieknop (bv. "Uitvoeren"); klik leidt de gebruiker via `fallbackUrl` of `canonicalUrl` naar de uitvoeringsomgeving van de aanbieder. |
| **Niveau 2** | **Type-specifieke CTA**              | `type` herkend (bv. `betaling`), `definitie` afwezig | Toont een gerichte actieknop (bv. "Betalen"); klik start de specifieke flow via de provider (met parameters of sessieoverdracht).                          |
| **Niveau 3** | **Lokale (embedded) uitvoering**     | `type` én `definitie` aanwezig (op detailendpoint)   | Rendert de interactie lokaal in het portaal (bv. direct bestanden uploaden of formulier invullen); verzending gaat naar `definitie.endpoint`.              |

:::info[Eisen aan de aanbieder bij Niveau 1 en 2]
Wanneer een portaal kiest voor Niveau 1 of 2, verlaat de gebruiker het portaal naar de omgeving van de aanbieder. De aanbieder moet er daarom voor zorgen dat de landingspagina (`fallbackUrl` of `canonicalUrl`) de taak zelfstandig kan afhandelen.
:::

---

## Additief model en evolutie

De Interactie API volgt het [Robustness principle](https://en.wikipedia.org/wiki/Robustness_principle): _wees conservatief in wat je stuurt, en liberaal in wat je accepteert_.

- **Geen capability handshake:** Er vindt geen voorafgaande onderhandeling plaats tussen kanaal en API. De API levert alle beschikbare velden mee; het kanaal gebruikt wat het ondersteunt en negeert onbekende velden.
- **Onafhankelijke evolutie:** Een aanbieder kan nieuwe functionaliteit toevoegen (zoals een rijkere formulierdefinitie) zonder dat oudere portalen stuklopen: die blijven de taak gewoon via Niveau 1 of 2 aanbieden.
- **Universele fallback:** Elk interactief item heeft altijd minimaal een `canonicalUrl` (landingsplek) en waar van toepassing een `fallbackUrl` (uitvoeringsplek). Zelfs als een kanaal een nieuw type interactie niet kent, loopt de gebruiker nooit vast.

---

## Gerelateerd

| Onderdeel                 | Verwijzing                                                                                                                        |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| **Portaalwissels**        | Hoe de overdracht verloopt bij Niveau 1 en 2: [Portaalwissels](./portaalwissels.md)                                               |
| **Contractspecificaties** | De concrete operaties en schema's: [Kernmodule](./referentie/zoek-context.api.mdx) en [Taken](./referentie/retrieve-taak.api.mdx) |

---
sidebar_position: 1
---

# Contextschermen

Contextschermen (of thematische schermen) tonen informatie en interacties die horen bij een samenhangend geheel: een lopende zaak, een aanvraag, een dossier of een specifiek thema.

Binnen MijnServices is **Context** het centrale begrip: het brengt zowel de samenhang als de inhoudelijke duiding en inzage van documenten, berichten en taken samen. Dit sluit direct aan op de Interactie API, waar via `POST /context/zoek` een samengesteld contextresultaat wordt opgevraagd.

## Doel en interactiepatroon

Waar overzichtsschermen de breedte opzoeken, brengt een contextscherm rust en samenhang:

- **Samenhang & status:** Welke documenten, besluiten, contactmomenten en statussen horen bij déze vergunning of aanvraag?
- **Begrip & duiding:** Wat betekent de huidige status en wat is de verwachte voortgang of besluitdatum?
- **Inzage & toelichting:** De inwoner kan direct doorklikken naar de inhoud van een document of de toelichting bij een openstaande taak.
- **Gerichte actie:** Welke acties of taken moet ik specifiek voor dit onderwerp uitvoeren?

In plaats van losse, versnipperde interacties ervaart de gebruiker hier één integraal dossier- of themabeeld. Vanuit de context kan de inwoner vervolgens direct doorstromen naar de daadwerkelijke [Uitvoering](../uitvoering/).

## Beschikbare schermprofielen

| ID                     | Schermprofiel                              | Scope                        | Doel                                                                                 |
| :--------------------- | :----------------------------------------- | :--------------------------- | :----------------------------------------------------------------------------------- |
| `SCR-TAKEN-IN-CONTEXT` | [Taken in context](./taken-in-context.mdx) | Contextueel (Zaak / Dossier) | Taken raadplegen en afhandelen binnen de specifieke context van een zaak of product. |

# Interactie API

De Interactie API is het publieke contract tussen kanalen en de interactielaag
van MijnServices. De API maakt het mogelijk dat kanalen (zoals MijnOverheid of een
lokale MijnOmgeving) klantgerelateerde gegevens en taken uniform kunnen tonen en
uitvoeren, terwijl de data en daadwerkelijke verwerking bij de verantwoordelijke
dienstverlener blijven.

## Uitgangspunten voor de rolverdeling

1. **Interactiecontract, geen beheerregister**  
   De Interactie API is geen zaaksysteem of administratief register. De API beantwoordt de vraag: _welke informatie, context en handelingsmogelijkheden moet een kanaal op dit moment aan de gebruiker tonen?_ Het registreren, behandelen en archiveren van dossiers blijft bij de verantwoordelijke organisatie.
2. **Uitvoering bij de bron**  
   Het kanaal toont de taak of context en faciliteert de interactie, maar de verwerking en definitieve statusbepaling liggen altijd bij de bronorganisatie.
3. **Context als primair concept**  
   Informatie en handelingen worden opgevraagd in samenhang: bijvoorbeeld taken binnen de context van een zaak of product.

## Opzet van de Interactie API

De documentatie en het ontwerp van de Interactie API zijn opgebouwd langs de
volgende onderdelen:

- [Implementatieniveaus](./implementatieniveaus.md) — De drie niveaus van interactiediepte (van doorverwijzen tot embedded uitvoering) en het additieve groeimodel.
- [Portaalwissels](./portaalwissels.md) — De gebruikers- en systeemflows bij cross-domein sessieoverdracht en herauthenticatie.
- [Positionering](./positionering.md) — Rolverdeling in het landschap (frontends, BFF's en gefedereerde ketens).
- **Kernmodule** — De gedeelde contractbasis (klant- en contextquery's, foutmodellen en kern-DTO's).
- **Uitbreidingsmodules** — Domeinspecifieke modules die hierop voortbouwen, te beginnen met **Taken**.

## Contracten en specificaties

Voor versie `v0.1` is de publiceerbare specificatie beschikbaar via:

- [`v0.1/openapi.yaml`](./v0.1/openapi.yaml)
- [Gegenereerde API-referentie](./referentie/interactieservices-api.info.mdx)

Domeinbegrippen en functionele behoeften zijn beschreven in de bijbehorende
bouwstenen, zoals [MijnTaken](../bouwstenen/mijn-taken/index.md).

## Aansluitprofielen

Aansluitprofielen beschrijven hoe bestaande bronsystemen en back-end API's kunnen
aansluiten op het contract van de Interactie API. Zie hiervoor de sectie
[Aansluitprofielen](../aansluitprofielen/index.md).

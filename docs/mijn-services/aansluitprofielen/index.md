---
draft: true
sidebar_position: 0
---

# Aansluitprofielen

:::info[Niet-normatief / implementatiehulp]
Aansluitprofielen maken nadrukkelijk **geen onderdeel uit van de formele standaard** van de Interactie API. De Interactie API definieert het uniforme en bron-agnostische contract richting kanalen en portalen. Aansluitprofielen dienen als niet-normatieve referentiemappings en adapter-patronen om te laten zien hoe bestaande bronsystemen en back-end API's (zoals OpenVTB of ZGW) op dat contract kunnen aansluiten.
:::

Een aansluitprofiel beschrijft hoe een bestaand systeem of een bestaande API
aansluit op MijnServices. Het maakt de vertaling van een interactiebouwsteen en
de bijbehorende specificaties naar een concrete koppeling expliciet.

| Aansluitprofiel                           | Gebruik voor                                      |
| ----------------------------------------- | ------------------------------------------------- |
| [ZGW](./zgw)                              | Koppelen van zaakgerichte systemen.               |
| [OpenVtb Taken API](./openvtb-taken-api/) | Aansluiten op de Taken API van OpenVtb.           |
| [Combinaties](./combinaties)              | Combineren van meerdere bron-API's voor één flow. |
| [NotifyNL API](./notifynl-api)            | Afleveren van attenderingen en notificaties.      |

Kies een aansluitprofiel nadat de benodigde interactie en bouwsteen duidelijk
zijn. Niet elke implementatie heeft een aansluitprofiel nodig; gebruik alleen
het profiel dat past bij het systeem waarmee wordt gekoppeld.

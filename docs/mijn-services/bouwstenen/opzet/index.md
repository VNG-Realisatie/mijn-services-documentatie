---
title: Opzet en Definition of Done voor Bouwstenen
sidebar_label: Opzet en DoD
sidebar_position: 1
draft: true
---

# Opzet en Definition of Done voor Bouwstenen

:::info[Referentiekader voor auteurs]
Dit document beschrijft de standaardstructuur en de kwaliteitseisen (Definition of Done) voor interactiebouwstenen binnen MijnServices. Het dient als inhoudelijk en redactioneel kader om bouwstenen uniform, scherp afgebakend en conceptueel zuiver uit te werken.
:::

## De keten: van abstract naar concreet

Om te borgen dat de verschillende onderdelen van MijnServices elkaar versterken zonder overlap, hanteren we een heldere scheiding van abstract naar concreet:

```mermaid
flowchart TD
    A["1. Klantreis & Klantscenario's<br/>De menselijke opgave: wat probeert iemand op te lossen?"]
    B["2. Bouwstenen (Conceptueel & Abstract)<br/>De herbruikbare interactie-capability: betekenis, behoeften en use cases"]
    C["3. Schermprofielen (Presentatie & UX)<br/>De vertaling naar toegankelijke interactiepatronen en schermen"]
    D["4. Interactie API (Technisch Contract)<br/>Het kanaalonafhankelijke API-contract (operaties, DTO's en modules)"]
    E["5. Aansluitprofielen (Realisatie bij de bron)<br/>De mapping van bestaande bronsystemen op de Interactie API"]

    A --> B
    B --> C
    C --> D
    D --> E
```

Binnen deze keten is de **bouwsteen de inhoudelijke en functionele basis**:

- De bouwsteen beschrijft **wat** de interactie inhoudt en **waarom** deze waarde heeft voor de inwoner of ondernemer.
- De bouwsteen is **kanaalonafhankelijk**: de interactie kan vorm krijgen in een mijnomgeving, bij de balie, in het KCC of via een notificatie.
- De bouwsteen is **bronsysteemonafhankelijk**: de betekenis van begrippen staat centraal, niet de database- of zaaksysteemstructuur van een leverancier.
- De bouwsteen is **combineerbaar (composable)**: ontworpen als zelfstandige bouwsteen die kanalen vrij kunnen combineren (bijvoorbeeld een zaakstatus gecombineerd met openstaande acties).

### Bouwstenen als gestandaardiseerde interactiemomenten (Jobs to Be Done)

Een inwoner of ondernemer komt niet naar de overheid om "een zaak te beheren" of "een taak uit te voeren". De werkelijke opgave ligt in het dagelijks leven of ondernemen: een dakkapel plaatsen, verhuizen of een subsidie ontvangen (de _Job to Be Done_).

Een **bouwsteen is daarom geen doel op zich**, maar een **gestandaardiseerd interactiemoment** waarmee een specifieke stap binnen die bredere opgave wordt ondersteund. Eén klantreis of scenario doorloopt in de praktijk meerdere van zulke interactiemomenten:

- De inwoner wil weten hoe het staat met de aanvraag → interactiemoment via **MijnZaken**.
- De overheid vraagt om een ontbrekend bewijsstuk → interactiemoment via **MijnTaken**.
- De leges moeten worden voldaan → interactiemoment via **MijnTaken** (betaling).
- Het besluit wordt gecommuniceerd → interactiemoment via **MijnBerichten** en **MijnZaken**.

De bouwsteen beschrijft de herbruikbare capability die nodig is om zo'n interactiemoment betekenisvol, begrijpelijk en consistent in te vullen.

---

## Wat hoort WEL en NIET in een bouwsteen?

Om verkokering en overlap te voorkomen, hanteren we een strikte afbakening:

| Onderdeel                                                 | Wel in de bouwsteen? | Waar hoort het dan wel?                                     |
| :-------------------------------------------------------- | :------------------: | :---------------------------------------------------------- |
| **Doel en gebruikersbehoeften** _(weten, doen, volgen)_   |        ✅ Ja         | Centraal in de bouwsteen                                    |
| **Scope en afbakening** _(wat wel / wat expliciet niet)_  |        ✅ Ja         | Centraal in de bouwsteen                                    |
| **Begrippenkader & betekenis** _(inwonertaal, statussen)_ |        ✅ Ja         | Centraal in de bouwsteen                                    |
| **Use cases** _(functionele gebruikersdoelen & flows)_    |        ✅ Ja         | Centraal in de bouwsteen                                    |
| **Attenderingsmomenten** _(wanneer en wat signaleren)_    |        ✅ Ja         | Centraal in de bouwsteen                                    |
| **Samenhang met andere bouwstenen**                       |        ✅ Ja         | Centraal in de bouwsteen                                    |
| **Concrete schermontwerpen, wireframes en componenten**   |        ❌ Nee        | Onder [Schermprofielen](../../schermprofielen/index.md)     |
| **Technische API-payloads, endpoints en DTO's**           |        ❌ Nee        | Onder [Interactie API](../../interactie-api/index.md)       |
| **Aansluiting op bronsystemen** _(bv. ZGW, OpenVTB)_      |        ❌ Nee        | Onder [Aansluitprofielen](../../aansluitprofielen/index.md) |
| **Interne behandelprocessen van ambtenaren**              |        ❌ Nee        | Buiten scope van MijnServices                               |

---

## Standaardstructuur (Sjabloon voor een bouwsteen)

Elke bouwsteen volgt bij voorkeur deze vaste hoofdstukindeling:

### 1. Inleiding & Doel

- Korte samenvatting van de bouwsteen in 2 à 3 zinnen.
- Welke maatschappelijke opgave of doel in het leven van de burger of ondernemer ondersteunt deze bouwsteen?

### 2. Doel en gebruikersbehoeften

- Wat wil de inwoner of ondernemer in deze interactie:
  - **Weten?** (inzicht, betekenis, rechten, actuele stand van zaken)
  - **Doen?** (handeling verrichten, informatie aanleveren, reageren, betalen)
  - **Volgen?** (voortgang, bevestiging, gemoedsrust)

### 3. Scope en samenhang

- **Wat valt er wél onder:** de kern van deze interactiecapability.
- **Wat valt er expliciet níet onder:** raakvlakken die bij een andere bouwsteen of organisatieproces horen (bv. _"MijnZaken toont de context en status van een zaak, maar een actiegerichte handeling die daaruit voortvloeit wordt afgehandeld via MijnTaken"_).
- **Combineren met andere bouwstenen:** hoe deze bouwsteen samensmelt met andere bouwstenen in kanalen (bijvoorbeeld een zaakdetailpagina die tegelijk status, openstaande acties en berichten toont).

### 4. Begrippenkader

- Heldere definities van kernbegrippen en functionele toestanden (zoals statussen) in **begrijpelijke taal**.
- Geen interne zaaksysteemtermen of leveranciersjargon; redeneer vanuit wat de gebruiker ervaart.

### 5. Use cases

- De primaire functionele interacties die de bouwsteen mogelijk maakt (genummerd: `UC-01`, `UC-02`, etc.).
- Per use case:
  - **Doel:** Wat wil de actor bereiken?
  - **Wat de bouwsteen ondersteunt:** Puntenlijst van functionele behoeften en interactiemogelijkheden.
  - **Resultaat:** De toestand na afloop (wat weet of heeft de gebruiker nu?).
  - Verwijzing naar concrete [Klantscenario's](../../scenarios/index.md) die deze use case illustreren.

### 6. Attenderen

- Bij welke gebeurtenissen binnen deze bouwsteen is attendering van de gebruiker relevant (bijvoorbeeld een nieuw verzoek, gewijzigde status of naderende termijn)?
- Wat moet de attendering functioneel overbrengen en waarnaar moet veilig worden verwezen?
- Let op: attendering is functioneel beschreven, onafhankelijk van het specifieke bezorgkanaal (SMS, e-mail, notificatie).

### 7. Gerelateerd

Een compacte referentietabel met doorkliklinks naar gerelateerde onderdelen:

| Onderdeel           | Verwijzingen                                                          |
| :------------------ | :-------------------------------------------------------------------- |
| **Klantscenario's** | Directe link(s) naar scenario's waarin deze bouwsteen wordt toegepast |
| **Schermprofielen** | Directe link(s) naar schermen die deze bouwsteen presenteren          |
| **Interactie API**  | Directe link naar de relevante module van de Interactie API           |

---

## Definition of Done (DoD) voor een bouwsteen

Een bouwsteen geldt als **volledig uitgewerkt** wanneer aan de volgende criteria is voldaan:

### Kwaliteit & Inhoud

- [ ] **Buiten-naar-binnen geformuleerd:** De tekst redeneert vanuit de burger of ondernemer, niet vanuit een gemeentelijke afdeling of wet.
- [ ] **Begrijpelijke taal:** Kernbegrippen en statussen zijn gedefinieerd in duidelijke taal (geen zaaksysteemtermen).
- [ ] **Kanaalonafhankelijk:** De tekst schrijft geen specifieke schermen, knoppen of UI-layouts voor.
- [ ] **Bronsysteemonafhankelijk:** Geen aannames over specifieke leverancierssoftware of interne brondatastructuren.
- [ ] **Combineerbaar ontworpen (composability):** De interacties kunnen in kanalen vrij worden gecombineerd met andere bouwstenen.
- [ ] **Samenhang expliciet:** De afbakening en wisselwerking met andere bouwstenen is scherp benoemd.
- [ ] **Use cases scherp:** De functionele gebruikersdoelen (`UC-01`, `UC-02`) zijn uitgewerkt met doel, ondersteuning en resultaat.
- [ ] **Attenderingsmomenten benoemd:** Er is beschreven wanneer en waarom een attendering nodig is.

### Samenhang & Traceerbaarheid

- [ ] **Gekoppeld aan scenario's:** Er is minstens één klantscenario gekoppeld waarin deze bouwsteen een rol speelt.
- [ ] **Koppeling met Interactie API:** De functionele interacties sluiten aan op een module binnen de Interactie API.
- [ ] **Gerelateerd-tabel compleet:** De pagina bevat de compacte doorkliktabel naar scenario's, schermen en API.

### Publicatiestatus

- [ ] **Voldoet aan de schrijfwijzer:** Actieve zinnen, beknopt, geen onnodig vakjargon.
- [ ] **Review door werkgroep/community:** Afgestemd met ontwerpers en inhoudelijk deskundigen.
- [ ] **Gereed voor publicatie:** `draft: true` kan worden verwijderd zodra de inhoud formeel is vastgesteld.

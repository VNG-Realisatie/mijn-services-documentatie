---
title: Opzet en Definition of Done voor Bouwstenen
sidebar_label: Opzet en DoD
sidebar_position: 1
draft: true
---

# Opzet en Definition of Done voor Bouwstenen

:::info[Werkdocument (Draft)]
Dit document beschrijft de standaardstructuur en de kwaliteitseisen (Definition of Done) voor interactiebouwstenen binnen MijnServices. Het dient als referentiekader om bestaande en nieuwe bouwstenen uniform en scherp afgebakend uit te werken.
:::

## Wat is een interactiebouwsteen?

Een interactiebouwsteen binnen MijnServices beschrijft een herkenbaar onderdeel van overheidsdienstverlening **vanuit het perspectief van de burger of ondernemer**. 

Een bouwsteen:
- vertrekt vanuit wat iemand wil weten, doen of volgen (buiten-naar-binnen);
- is **kanaalonafhankelijk**: de bouwsteen kan vorm krijgen in een mijnomgeving, bij de balie, in het KCC of via een notificatie;
- is **bronsysteemonafhankelijk**: de bouwsteen beschrijft de betekenis van de interactie, niet de interne datastructuur van een specifiek zaaksysteem of registratie;
- vormt de brug tussen de behoefte van de gebruiker enerzijds en de technische specificaties (modellen, API's, aansluitprofielen) anderzijds.

---

## Wat hoort WEL en NIET in een bouwsteen?

Om verkokering en overlap te voorkomen, hanteren we een duidelijke scheiding van verantwoordelijkheden:

| Onderdeel | Wel in de bouwsteen? | Waar hoort het dan wel? |
| :--- | :---: | :--- |
| **Doel en gebruikersbehoeften** | ✅ Ja | Centraal in de bouwsteen |
| **Functionele interacties (capabilities)** | ✅ Ja | Centraal in de bouwsteen |
| **Begrippenkader (begrijpelijke taal)** | ✅ Ja | Centraal in de bouwsteen |
| **Samenhang met andere bouwstenen** | ✅ Ja | Centraal in de bouwsteen |
| **Vertaling naar kanalen (richtlijnen)** | ✅ Ja (conceptueel) | Concrete uitwerking onder `kanalen/` |
| **Schermontwerpen en UI-componenten** | ❌ Nee | Onder `kanalen/mijn-omgeving/schermprofielen/` |
| **Technische API-payloads en DTO's** | ❌ Nee | Onder `specificaties/interactieservices-api/` |
| **Formele informatiemodellen** | ❌ Nee | Onder `specificaties/functionele-modellen/` |
| **Koppelingen met bronsystemen** | ❌ Nee | Onder `aansluitprofielen/` (bv. ZGW, Open VTB) |
| **Interne behandelprocessen van ambtenaren**| ❌ Nee | Buiten scope van MijnServices |

---

## Standaardstructuur (Sjabloon)

Elke bouwsteenpagina volgt bij voorkeur deze vaste hoofdstukindeling:

### 1. Inleiding & Doel
- Korte samenvatting van de bouwsteen in 2 à 3 zinnen.
- Welke opgave of welk doel in het leven of bedrijf van de burger of ondernemer ondersteunt deze bouwsteen?

### 2. Gebruikersbehoeften
- Wat wil de gebruiker in deze context:
  - **Weten?** (inzicht, status, betekenis, rechten)
  - **Doen?** (actie uitvoeren, document aanleveren, afspraak plannen)
  - **Volgen?** (voortgang, bevestiging, gemoedsrust)

### 3. Afbakening & Scope
- **Wat valt er wél onder:** de kern van deze interactie.
- **Wat valt er expliciet níet onder:** raakvlakken die bij een andere bouwsteen of bronsysteem horen (bv. *"MijnZaken toont de context van een zaak, maar de actiegerichte taak die daaruit voortvloeit wordt afgehandeld via MijnTaken"*).

### 4. Functionele interacties (Capabilities)
- Overzicht van de belangrijkste functionele handelingen die mogelijk zijn, beschreven in functionele operaties (bijv. raadplegen, zoeken, reageren, bevestigen).

### 5. Begrippenlijst
- Heldere definities van de kernbegrippen in begrijpelijke taal (geen interne zaaksysteemtermen).

### 6. Relatie met andere bouwstenen
- Hoe grijpt deze bouwsteen in op de andere 7 bouwstenen? (Bijv. MijnTaken leidt naar MijnZaken; MijnBerichten attendeert op een taak; MijnAgenda toont afspraken die horen bij een zaak).

### 7. Gebruik in kanalen
- Hoe manifesteert deze interactie zich in:
  - **MijnOmgeving / Portaal** (verwijzing naar bijbehorende schermprofielen).
  - **Notificaties / Attenderingen** (e-mail, SMS, app-notificatie via NotifyNL).
  - **Contact & Balie** (KCC, fysieke balie).

### 8. Specificaties en standaarden
- Verwijzingen naar:
  - Functioneel model (`specificaties/functionele-modellen/...`)
  - Interactieservices API (`specificaties/interactieservices-api/...`)
  - Relevante aansluitprofielen (`aansluitprofielen/...`)

---

## Definition of Done (DoD) voor een bouwsteen

Een bouwsteen geldt als **volledig uitgewerkt** wanneer aan de volgende criteria is voldaan:

### Kwaliteit & Inhoud
- [ ] **Buiten-naar-binnen geformuleerd**: De beschrijving redeneert vanuit de burger of ondernemer, niet vanuit een interne afdeling of wet.
- [ ] **Geen kanaal-lockin**: De tekst schrijft geen vaste schermen of UI-knoppen voor.
- [ ] **Geen systeem-lockin**: Er worden geen bronspecifieke eigenschappen (zoals databasevelden van één leverancier) voorgeschreven.
- [ ] **Begrippen eenduidig**: Termen zijn afgestemd met het overkoepelende begrippenkader van MijnServices.
- [ ] **Duidelijke samenhang**: De koppeling met gerelateerde bouwstenen is expliciet benoemd.

### Technische koppeling
- [ ] **Functioneel model**: Er is een semantisch model of begrippenkader aanwezig onder `specificaties/functionele-modellen/`.
- [ ] **API-contract**: De benodigde operaties zijn gemapt op de Interactieservices API.
- [ ] **Aansluiting op bronnen**: Er is minstens één aansluitprofiel of migratiepad beschreven.

### Publicatiestatus
- [ ] **Voldoet aan de schrijfwijzer**: Begrijpelijke taal, actieve zinnen, geen onnodig vakjargon.
- [ ] **Review door werkgroep/community**: Getoetst met ontwerpers en architecten.
- [ ] **Klaar voor DON**: `draft: true` kan worden verwijderd zodat de bouwsteen meegaat in `export:don`.

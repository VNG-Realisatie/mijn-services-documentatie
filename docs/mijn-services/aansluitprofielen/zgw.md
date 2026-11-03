---
draft: true
sidebar_label: ZGW API's
---

:::info[Werkversie]

Dit aansluitprofiel is een eerste schets. Het profiel helpt onderzoeken hoe
informatie uit de ZGW API's kan worden geïnterpreteerd en vertaald naar het
functionele informatiemodel van MijnZaken.

:::

# Aansluitprofiel ZGW API's

Dit aansluitprofiel beschrijft hoe de ZGW API's als bron worden gebruikt voor de
Interactie API. De uitvoerbare workflows worden vastgelegd in Arazzo:
per operationId van de Interactie API beschrijft een workflow welke ZGW
API-operaties nodig zijn om de response-DTO samen te stellen.

## Positionering

De doelen en scope van MijnZaken worden beschreven bij de
[bouwsteen MijnZaken](../bouwstenen/mijn-zaken/). Deze schets werkt alleen uit
hoe informatie uit de ZGW API's kan worden geïnterpreteerd en vertaald naar
begrippen van MijnZaken, zoals zaak, status, resultaat, document en besluit.

Het aansluitprofiel beschrijft dus wat informatie uit de ZGW API's betekent
binnen MijnServices.

## Bronnen

Dit profiel gaat uit van de ZGW API's als bronfamilie. De precieze combinatie
kan per organisatie verschillen.

| ZGW API        | Rol in dit aansluitprofiel                                       |
| :------------- | :--------------------------------------------------------------- |
| Zaken API      | Bron voor zaken, statussen, zaakrelaties en zaakinformatie.      |
| Catalogi API   | Bron voor zaaktypen, statustypen, resultaattypen en toelichting. |
| Documenten API | Bron voor informatieobjecten en documenten bij een zaak.         |
| Besluiten API  | Bron voor formele besluiten die aan een zaak zijn gekoppeld.     |

De Notificaties API kan relevant zijn voor actualisatie of synchronisatie, maar
is geen primaire bron voor de betekenis van een zaak.

## Mapping naar MijnZaken

De tabel hieronder is bedoeld als koppeltabel. Per regel staat welk begrip in
MijnZaken wordt gevuld, welke ZGW-informatie daarvoor gebruikt kan worden en
welke interpretatie nodig is.

| MijnZaken-begrip         | ZGW-bron                  | Mogelijke ZGW-gegevens                                          | Interpretatie voor MijnZaken                                                                                                                                                               |
| :----------------------- | :------------------------ | :-------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zaak                     | Zaken API                 | `Zaak`                                                          | Een zaak vormt het ankerpunt voor de zaakcontext die aan de gebruiker wordt getoond. Niet alle interne zaakgegevens zijn relevant voor weergave.                                           |
| Zaaknummer               | Zaken API                 | `identificatie`                                                 | Wordt gebruikt als herkenbaar referentienummer. De herkomst of betekenis van het nummer kan per organisatie verschillen.                                                                   |
| Zaaktitel                | Zaken API, Catalogi API   | `omschrijving`, `zaaktype`                                      | De titel moet de zaak herkenbaar maken voor de gebruiker. Als de bronomschrijving te intern is, kan een presentatie- of vertaalregel nodig zijn.                                           |
| Zaaktype                 | Catalogi API              | `ZaakType`, `omschrijving`, `productenOfDiensten`               | Het zaaktype helpt zaken groeperen, filteren en herkennen. De functionele naam kan afwijken van de interne catalogusnaam.                                                                  |
| Behandelende organisatie | Zaken API                 | `bronorganisatie`, `verantwoordelijkeOrganisatie`               | Wordt gebruikt om duidelijk te maken welke organisatie de zaak behandelt of verantwoordelijk is voor de informatie.                                                                        |
| Registratiedatum         | Zaken API                 | `registratiedatum`                                              | Geeft aan wanneer de zaak is gestart of geregistreerd. Deze datum is niet altijd hetzelfde als het moment waarop de gebruiker de aanvraag heeft gedaan.                                    |
| Laatste wijziging        | Zaken API of bronmetadata | wijzigingsdatum of auditinformatie                              | ZGW kent niet altijd één duidelijke datum voor laatste wijziging. Per implementatie moet worden bepaald welke datum de actualiteit van de zaak het beste weergeeft.                        |
| Status                   | Zaken API, Catalogi API   | `Status`, `Statustype`, `datumStatusGezet`, `statustoelichting` | De actuele ZGW-status wordt vertaald naar een begrijpelijke status of mijlpaal voor MijnZaken. Interne statustypen kunnen samenkomen in een kleinere set gebruikersgerichte statusgroepen. |
| Statusgeschiedenis       | Zaken API, Catalogi API   | eerdere `Status`-objecten en `Statustype`                       | Wordt gebruikt voor een tijdlijn of voortgangsoverzicht. Niet elke interne status hoeft zichtbaar te zijn voor de gebruiker.                                                               |
| Resultaat                | Zaken API, Catalogi API   | `Resultaat`, `Resultaattype`, `toelichting`                     | Het resultaat maakt duidelijk hoe een afgeronde zaak is geëindigd. De betekenis moet worden vertaald naar begrijpelijke taal.                                                              |
| Einddatum                | Zaken API                 | `einddatum`, `einddatumGepland`, `uiterlijkeEinddatumAfdoening` | Datums moeten worden geduid als feitelijk, gepland, indicatief of wettelijk relevant.                                                                                                      |
| Document                 | Documenten API, Zaken API | `EnkelvoudigInformatieObject`, zaak-informatieobjectrelatie     | Documenten worden getoond in de context van de zaak. Niet ieder informatieobject is geschikt of toegestaan voor weergave aan de gebruiker.                                                 |
| Besluit                  | Besluiten API, Zaken API  | `Besluit`, besluit-zaakrelatie                                  | Een besluit wordt als formele beslissing in de zaakcontext getoond. De relatie met documenten en resultaat moet duidelijk zijn.                                                            |
| Betrokkene               | Zaken API                 | `Rol`, `RolType`                                                | Rollen worden vertaald naar begrijpelijke betrokkenheid, zoals aanvrager, gemachtigde, belanghebbende of behandelaar. Privacy en autorisatie bepalen wat zichtbaar mag zijn.               |
| Bronduiding              | Gebruikte ZGW API's       | API-bron, organisatie, registratiemoment, updategegevens        | MijnZaken moet kunnen uitleggen waar informatie vandaan komt en hoe actueel of formeel deze is.                                                                                            |

## Sequentie diagrammen

Er is een aantal (technische) sequentiediagrammen uitgewerkt voor het aanmaken van een zaak, voor het opvragen van een zaak, voor het bijwerken van een zaak en voor het verwijderen van een zaak. Voor de MijnServices is alleen Opvragen van een zaak van belang.

### Opvragen van een zaak
```mermaid
sequenceDiagram
    autonumber
    actor B as Burger (ingelogd met DigiD)
    participant MZ as MijnZaken (ZGW-consumer)
    participant ZRC as Zaken API 1.8
    participant ZTC as Catalogi API 1.4
    participant DRC as Documenten API

    B->>MZ: Open overzicht Mijn zaken
    Note over MZ: JWT met scope zaken.lezen<br/>De API autoriseert de applicatie, niet de burger:<br/>MijnZaken filtert zelf op het BSN van de ingelogde burger

    rect rgba(90,150,120,0.12)
    Note over MZ,ZTC: Fase 1 - Zakenoverzicht in één aanroep (Zaken API met expand)
    MZ->>ZRC: GET /zaken?rol__betrokkeneIdentificatie__natuurlijkPersoon__inpBsn={bsn}<br/>&rol__omschrijvingGeneriek=initiator&ordering=-startdatum<br/>&expand=zaaktype,status.statustype
    Note over ZRC: zrc-006 alleen zaken van geautoriseerde zaaktypen<br/>en tot de maximale vertrouwelijkheidaanduiding
    ZRC->>ZTC: GET {zaaktype-url}, GET {statustype-url}
    ZTC-->>ZRC: 200 Zaaktype, Statustype
    alt expand-attribuut ongeldig of niet op te halen
        ZRC-->>MZ: 404 (zrc-027, zrc-028)
    else
        ZRC-->>MZ: 200 Gepagineerde lijst zaken met _expand<br/>(zaaktype.omschrijving, status.statustype.omschrijving)
    end
    opt Selectie van velden bij grote lijsten
        MZ->>ZRC: POST /zaken/_zoek {filters, fields: [identificatie, startdatum,<br/>{zaaktype: [omschrijving]}, {status: [statustype]}]}
        Note over ZRC: zrc-029 fields en expand sluiten elkaar uit
        ZRC-->>MZ: 200 Lijst zaken met alleen de gevraagde velden
    end
    end

    B->>MZ: Open detail van een zaak

    rect rgba(170,130,90,0.12)
    Note over MZ,DRC: Fase 2 - Zaakdetail in één aanroep (Zaken API met geneste expand)
    MZ->>ZRC: GET /zaken/{uuid}?expand=zaaktype.statustypen,status.statustype,<br/>resultaat.resultaattype,rollen.roltype,eigenschappen,<br/>zaakobjecten,zaakinformatieobjecten.informatieobject
    Note over ZRC: zrc-026 expand tot willekeurige diepte, ook over API-grenzen
    ZRC->>ZTC: GET zaaktype, statustypen, resultaattype, roltypen
    ZTC-->>ZRC: 200 Catalogusgegevens
    ZRC->>DRC: GET {informatieobject-url} per zaakinformatieobject
    DRC-->>ZRC: 200 Informatieobjecten
    ZRC-->>MZ: 200 Zaak met _expand + ETag
    Note over MZ: Voortgangsbalk uit zaaktype.statustypen en status.statustype<br/>Toon alleen documenten die voor de burger bedoeld zijn
    opt Opnieuw openen, als de provider een ETag meegeeft
        MZ->>ZRC: GET /zaken/{uuid}?expand=... met If-None-Match: {etag}
        ZRC-->>MZ: 304 Not Modified of 200 met nieuwe ETag
    end
    end

    MZ-->>B: Zaakdetail met status, voortgang en documenten
```

### Aanmaken van een zaak
```mermaid
sequenceDiagram
    autonumber
    actor B as Burger / medewerker
    participant MZ as MijnZaken (ZGW-consumer)
    participant ZTC as Catalogi API 1.4
    participant ZRC as Zaken API 1.8
    participant DRC as Documenten API
    participant NRC as Notificaties API

    B->>MZ: Start aanvraag (bijv. via formulier)
    Note over MZ: JWT met scopes zaken.aanmaken, zaken.bijwerken,<br/>catalogi.lezen (+ documenten.aanmaken bij bijlagen)

    rect rgba(120,140,170,0.12)
    Note over MZ,ZTC: Fase 1 - Zaaktype en bijbehorende typen bepalen (Catalogi API)
    MZ->>ZTC: GET /zaaktypen?catalogus=..&identificatie=..&status=definitief&datumGeldigheid=vandaag<br/>&expand=statustypen,roltypen,eigenschappen,zaakobjecttypen,informatieobjecttypen
    ZTC-->>MZ: 200 Zaaktype (concept=false) met _expand: statustypen, roltypen,<br/>eigenschappen, zaakobjecttypen, informatieobjecttypen
    opt resultaatlijst is leeg (geen gepubliceerde, geldige versie)
        MZ-->>B: Aanvraag kan niet worden gestart
    end
    Note over MZ: Uit _expand bepalen: initieel statustype (laagste volgnummer),<br/>roltype met omschrijvingGeneriek initiator, toegestane eigenschappen,<br/>zaakobjecttypen en informatieobjecttypen. Eén aanroep in plaats van vijf.
    end

    opt Fase 2 - Zaaknummer vooraf reserveren (sinds Zaken API 1.7)
        MZ->>ZRC: POST /zaaknummer_reserveren {bronorganisatie}
        ZRC-->>MZ: 201 {zaaknummer}
    end

    rect rgba(90,150,120,0.12)
    Note over MZ,NRC: Fase 3 - Zaak aanmaken (Zaken API)
    MZ->>ZRC: POST /zaken {bronorganisatie, verantwoordelijkeOrganisatie,<br/>zaaktype, startdatum, [identificatie], omschrijving, ...}
    Note over ZRC: zrc-006 autorisatie op zaaktype en vertrouwelijkheid
    ZRC->>ZTC: GET {zaaktype-url}
    ZTC-->>ZRC: 200 Zaaktype
    Note over ZRC: zrc-001 zaaktype bestaat en is geldig<br/>zrc-015 productenOfDiensten subset van zaaktype<br/>zrc-002 identificatie uniek of genereren<br/>zrc-009 vertrouwelijkheid afleiden uit zaaktype
    alt validatie mislukt
        ZRC-->>MZ: 400 ValidatieFout / 403 geen autorisatie
    else validatie geslaagd
        ZRC-->>MZ: 201 Zaak {url, uuid, identificatie}
        ZRC-)NRC: POST /notificaties (kanaal zaken, resource zaak, actie create)
    end
    end

    rect rgba(170,130,90,0.12)
    Note over MZ,NRC: Fase 4 - Zaak verrijken (Zaken API)
    MZ->>ZRC: POST /statussen {zaak, statustype, datumStatusGezet}
    ZRC->>ZTC: GET {statustype-url}
    Note over ZRC: zrc-016 statustype hoort bij zaaktype
    ZRC-->>MZ: 201 Status
    ZRC-)NRC: notificatie (resource status, actie create)

    MZ->>ZRC: POST /rollen {zaak, roltype, betrokkeneType, roltoelichting,<br/>betrokkeneIdentificatie}
    ZRC->>ZTC: GET {roltype-url}
    Note over ZRC: zrc-019 roltype hoort bij zaaktype
    ZRC-->>MZ: 201 Rol (initiator)
    ZRC-)NRC: notificatie (resource rol, actie create)

    opt Zaakeigenschappen
        MZ->>ZRC: POST /zaken/{zaak_uuid}/zaakeigenschappen {zaak, eigenschap, waarde}
        Note over ZRC: zrc-018 eigenschap hoort bij zaaktype<br/>waarschuwing als waarde niet voldoet aan specificatie
        ZRC-->>MZ: 201 ZaakEigenschap
    end

    opt Zaakobjecten
        MZ->>ZRC: POST /zaakobjecten {zaak, objectType, object of objectIdentificatie, zaakobjecttype}
        ZRC-->>MZ: 201 ZaakObject
        ZRC-)NRC: notificatie (resource zaakobject, actie create)
    end
    end

    opt Fase 5 - Documenten koppelen (Documenten API + Zaken API)
        MZ->>DRC: POST /enkelvoudiginformatieobjecten {bronorganisatie, informatieobjecttype, inhoud, ...}
        DRC-->>MZ: 201 EnkelvoudigInformatieObject
        MZ->>ZRC: POST /zaakinformatieobjecten {zaak, informatieobject}
        ZRC->>DRC: GET {informatieobject-url}
        Note over ZRC: zrc-003 informatieobject bestaat<br/>zrc-017 informatieobjecttype hoort bij zaaktype<br/>zrc-004 aardRelatie hoort_bij, registratiedatum gezet
        ZRC->>DRC: POST /objectinformatieobjecten {informatieobject, object=zaak, objectType=zaak}
        Note over ZRC,DRC: zrc-005 relatie spiegelen in Documenten API
        DRC-->>ZRC: 201 ObjectInformatieObject
        ZRC-->>MZ: 201 ZaakInformatieObject
        ZRC-)NRC: notificatie (resource zaakinformatieobject, actie create)
    end

    rect rgba(120,140,170,0.12)
    Note over MZ,ZRC: Fase 6 - Resultaat controleren en tonen (Zaken API met expand)
    MZ->>ZRC: GET /zaken/{uuid}?expand=status.statustype,rollen,eigenschappen,<br/>zaakobjecten,zaakinformatieobjecten.informatieobject
    ZRC-->>MZ: 200 Zaak met _expand (volledige registratie in één response)
    end

    MZ-->>B: Bevestiging met zaaknummer
```

### Bijwerken van een zaak
```mermaid
sequenceDiagram
    autonumber
    actor B as Burger / medewerker
    participant MZ as MijnZaken (ZGW-consumer)
    participant ZRC as Zaken API 1.8
    participant ZTC as Catalogi API 1.4
    participant DRC as Documenten API
    participant NRC as Notificaties API

    B->>MZ: Wijzig gegevens van een zaak
    Note over MZ: JWT met zaken.lezen en zaken.bijwerken<br/>(zaken.statussen.toevoegen, zaken.heropenen of<br/>zaken.geforceerd-bijwerken waar nodig)

    MZ->>ZRC: GET /zaken/{uuid}?expand=status.statustype,rollen,eigenschappen,<br/>zaaktype.statustypen,zaaktype.roltypen,zaaktype.resultaattypen,<br/>zaakinformatieobjecten.informatieobject
    ZRC->>ZTC: GET zaaktype met statustypen, roltypen, resultaattypen
    ZTC-->>ZRC: 200 Catalogusgegevens
    ZRC->>DRC: GET {informatieobject-url} per zaakinformatieobject
    DRC-->>ZRC: 200 Informatieobjecten
    ZRC-->>MZ: 200 Zaak met _expand: huidige toestand plus alle toegestane typen
    Note over MZ: Uit _expand bepalen: volgende statustype en eindstatus (hoogste volgnummer),<br/>roltypen, resultaattypen en documenten zonder indicatieGebruiksrecht.<br/>Geen aparte aanroepen naar de Catalogi API meer nodig.

    rect rgba(90,150,120,0.12)
    Note over MZ,NRC: Fase 1 - Zaakgegevens wijzigen (Zaken API)
    MZ->>ZRC: PATCH /zaken/{uuid} {gewijzigde attributen} of PUT met volledige zaak
    Note over ZRC: zrc-006 autorisatie op zaaktype
    alt zaak heeft eindstatus en geen scope geforceerd-bijwerken
        ZRC-->>MZ: 403 (zrc-007 afgesloten zaak)
    else zaaktype gewijzigd (mogelijk sinds Zaken API 1.5)
        ZRC->>ZTC: GET {nieuw zaaktype-url}
        ZTC-->>ZRC: 200 Zaaktype
        Note over ZRC: zrc-001 geldig zaaktype, zrc-015 producten of diensten
        ZRC-->>MZ: 200 Zaak
    else overige wijziging
        Note over ZRC: zrc-002 uniciteit identificatie, zrc-013 hoofdzaak,<br/>zrc-014 betalingsindicatie, zrc-012 gegevensgroepen
        ZRC-->>MZ: 200 Zaak
    end
    ZRC-)NRC: notificatie (resource zaak, actie update of partial_update)
    end

    rect rgba(120,140,170,0.12)
    Note over MZ,NRC: Fase 2 - Status en betrokkenen wijzigen
    MZ->>ZRC: POST /statussen {zaak, statustype, datumStatusGezet}
    Note over ZRC: zrc-016 statustype hoort bij zaaktype<br/>Een status wordt toegevoegd, nooit overschreven
    ZRC-->>MZ: 201 Status
    ZRC-)NRC: notificatie (resource status, actie create)
    opt Betrokkene wijzigen
        MZ->>ZRC: PUT /rollen/{uuid} {zaak, roltype, betrokkeneType, ...}
        Note over ZRC: PUT op rollen is nieuw in Zaken API 1.8<br/>zrc-019 roltype hoort bij zaaktype
        ZRC-->>MZ: 200 Rol
        ZRC-)NRC: notificatie (resource rol, actie update)
    end
    opt Zaakeigenschap of zaakobject wijzigen
        MZ->>ZRC: PATCH /zaken/{zaak_uuid}/zaakeigenschappen/{uuid} of PATCH /zaakobjecten/{uuid}
        ZRC-->>MZ: 200 ZaakEigenschap of ZaakObject
    end
    end

    opt Fase 3 - Zaak afsluiten
        Note over MZ: Controleer vooraf in _expand dat elk document<br/>een indicatieGebruiksrecht heeft
        MZ->>ZRC: POST /resultaten {zaak, resultaattype, toelichting}
        Note over ZRC: zrc-020 resultaattype hoort bij zaaktype
        ZRC-->>MZ: 201 Resultaat
        MZ->>ZRC: POST /statussen {zaak, statustype = eindstatus, datumStatusGezet}
        Note over ZRC: zrc-007 eindstatus = hoogste volgnummer, resultaat verplicht
        loop per gekoppeld informatieobject
            ZRC->>DRC: GET {informatieobject-url}
            DRC-->>ZRC: 200 Informatieobject
        end
        alt indicatieGebruiksrecht is null bij een document
            ZRC-->>MZ: 400 indicatiegebruiksrecht-unset
        else
            ZRC->>ZTC: GET {resultaattype-url}
            ZTC-->>ZRC: 200 Resultaattype (archiefnominatie, archiefactietermijn,<br/>brondatumArchiefprocedure)
            Note over ZRC: einddatum = datumStatusGezet<br/>zrc-021 archiefnominatie en archiefactiedatum afleiden
            ZRC-->>MZ: 201 Status (zaak afgesloten)
            ZRC-)NRC: notificatie (resource status, actie create)
        end
    end

    opt Fase 4 - Zaak heropenen
        MZ->>ZRC: POST /statussen {zaak, statustype = geen eindstatus}
        Note over ZRC: zrc-008 scope zaken.heropenen vereist<br/>einddatum, archiefactiedatum en archiefnominatie worden null
        ZRC-->>MZ: 201 Status (zaak weer open)
        ZRC-)NRC: notificatie (resource status, actie create)
    end

    MZ->>ZRC: GET /zaken/{uuid}?expand=status.statustype,resultaat.resultaattype,rollen
    ZRC-->>MZ: 200 Bijgewerkte zaak met _expand
    MZ-->>B: Bevestiging van de wijziging
```

### Verwijderen van een zaak
```mermaid
sequenceDiagram
    autonumber
    actor A as Archivaris / beheerder
    participant MZ as Consumer (archief- of beheerapplicatie)
    participant ZRC as Zaken API 1.8
    participant ZTC as Catalogi API 1.4
    participant DRC as Documenten API
    participant NRC as Notificaties API

    Note over MZ: JWT met zaken.lezen en zaken.verwijderen<br/>Verwijderen hoort bij vernietiging volgens de selectielijst,<br/>niet bij het burgerportaal

    rect rgba(120,140,170,0.12)
    Note over MZ,ZTC: Fase 1 - Te vernietigen zaken bepalen
    A->>MZ: Start vernietigingsronde
    MZ->>ZRC: GET /zaken?archiefnominatie=vernietigen&archiefactiedatum__lt={vandaag}<br/>&archiefstatus=nog_te_archiveren<br/>&expand=zaaktype,resultaat.resultaattype,deelzaken,zaakinformatieobjecten.informatieobject
    ZRC->>ZTC: GET zaaktype en resultaattype per zaak
    ZTC-->>ZRC: 200 Zaaktype en resultaattype (selectielijstklasse, archiefactietermijn)
    ZRC->>DRC: GET {informatieobject-url} per zaakinformatieobject
    DRC-->>ZRC: 200 Informatieobjecten
    ZRC-->>MZ: 200 Kandidaat-zaken met _expand
    Note over MZ: Vernietigingslijst samenstellen uit _expand:<br/>zaaktype, resultaat en selectielijstklasse, deelzaken en<br/>documenten die na het verwijderen opgeruimd moeten worden
    MZ-->>A: Vernietigingslijst ter goedkeuring
    A->>MZ: Lijst goedgekeurd
    end

    opt Fase 2 - Losse relatie verwijderen (zonder de zaak te vernietigen)
        MZ->>ZRC: DELETE /zaakinformatieobjecten/{uuid}
        ZRC->>DRC: DELETE /objectinformatieobjecten/{uuid}
        Note over ZRC,DRC: Relatie wordt ook in de Documenten API verwijderd
        DRC-->>ZRC: 204
        ZRC-->>MZ: 204
        ZRC-)NRC: notificatie (resource zaakinformatieobject, actie destroy)
    end

    rect rgba(190,100,100,0.12)
    Note over MZ,NRC: Fase 3 - Zaak vernietigen (Zaken API)
    loop per goedgekeurde zaak
        MZ->>ZRC: DELETE /zaken/{uuid}
        Note over ZRC: zrc-006 autorisatie op zaaktype, scope zaken.verwijderen
        alt niet geautoriseerd
            ZRC-->>MZ: 403
        else
            Note over ZRC: zrc-023 geen soft-delete. Verwijder ook deelzaken, statussen,<br/>resultaat, rollen, zaakobjecten, zaakeigenschappen, kenmerken,<br/>zaakinformatieobjecten, zaakverzoeken, zaakcontactmomenten,<br/>klantcontacten en audittrail
            loop per zaakinformatieobject
                ZRC->>DRC: DELETE /objectinformatieobjecten/{uuid} (indien mogelijk)
                DRC-->>ZRC: 204
            end
            ZRC-->>MZ: 204 No Content
            ZRC-)NRC: notificatie (resource zaak, actie destroy)
        end
    end
    end

    opt Fase 4 - Documenten vernietigen (Documenten API)
        Note over MZ: Documenten uit de eerder opgehaalde _expand,<br/>zodat na het verwijderen van de zaak geen extra lookup nodig is
        loop per document dat nergens anders meer aan gekoppeld is
            MZ->>DRC: DELETE /enkelvoudiginformatieobjecten/{uuid}
            DRC-->>MZ: 204
        end
    end

    MZ-->>A: Verklaring van vernietiging
```

## Interpretatieregels

Voor ZGW zijn in ieder geval deze regels relevant.

### Statussen vertalen naar gebruikersgerichte mijlpalen

ZGW-statustypen zijn vaak ingericht vanuit het behandelproces van een
organisatie. MijnZaken gebruikt statussen vooral om de gebruiker grip te geven.
Daarom kan een mapping nodig zijn van meerdere interne statustypen naar een
kleinere set begrijpelijke statusgroepen of mijlpalen.

Voorbeeld:

| ZGW-statustype  | MijnZaken-statusgroep | Toelichting                           |
| :-------------- | :-------------------- | :------------------------------------ |
| Ontvangen       | Ontvangen             | De aanvraag of melding is ontvangen.  |
| In behandeling  | In behandeling        | De organisatie werkt aan de zaak.     |
| Besluit genomen | Beslist               | Er is een formele beslissing genomen. |
| Afgehandeld     | Afgerond              | De zaak is afgerond.                  |

### Datums duiden

Datums uit ZGW hebben verschillende betekenissen. MijnZaken moet voorkomen dat
een datum zonder context als harde belofte wordt gelezen.

| Datum                          | Mogelijke betekenis voor MijnZaken             |
| :----------------------------- | :--------------------------------------------- |
| `registratiedatum`             | De zaak is geregistreerd of gestart.           |
| `datumStatusGezet`             | De status is op dit moment ingegaan.           |
| `einddatumGepland`             | Verwachte of geplande afronding.               |
| `uiterlijkeEinddatumAfdoening` | Uiterste afhandeltermijn, wanneer beschikbaar. |
| `einddatum`                    | De zaak is feitelijk afgerond.                 |

### Documenten selecteren voor weergave

Niet elk informatieobject bij een zaak is bedoeld voor de gebruiker. Het profiel
moet daarom vastleggen welke documenttypen of informatieobjecten zichtbaar mogen
zijn, hoe de documentnaam wordt getoond en of een document formeel, ingediend of
ondersteunend is.

### Besluiten verbinden met resultaat

Een besluit en een resultaat zijn niet hetzelfde. Een resultaat geeft aan hoe de
zaak is geëindigd; een besluit is een formele beslissing die daar onderdeel van
kan zijn. MijnZaken moet deze begrippen in samenhang tonen zonder ze te
vermengen.

### Ontbrekende of afgeleide informatie

Niet alle informatie die MijnZaken nodig heeft, is altijd rechtstreeks in ZGW
beschikbaar. Het profiel maakt daarom onderscheid tussen verschillende
modaliteiten.

| Modaliteit               | Betekenis                                                                        |
| :----------------------- | :------------------------------------------------------------------------------- |
| Rechtstreeks beschikbaar | De informatie is direct beschikbaar uit een ZGW-object of relatie.               |
| Afleidbaar               | De informatie kan worden afgeleid uit een combinatie van ZGW-gegevens.           |
| Verrijkt                 | De informatie komt uit ZGW, maar heeft extra tekst, ordening of vertaling nodig. |
| Niet beschikbaar         | De informatie kan met dit aansluitprofiel niet worden geleverd.                  |

## Open vragen

Deze schets laat nog een aantal keuzes open:

- Welke ZGW-statustypen worden per zaaktype vertaald naar welke
  MijnZaken-statusgroepen?
- Welke documenten en informatieobjecten mogen aan de gebruiker worden getoond?
- Wanneer wordt een datum als formeel, indicatief of alleen informatief getoond?
- Welke relatie wordt gelegd tussen zaak, besluit, document en resultaat?
- Welke informatie over betrokkenen is nodig en toegestaan in de zaakcontext?

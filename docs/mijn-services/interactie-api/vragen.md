---
sidebar_position: 8
---

# Vragen

## Taken functioneel

**Is de scope beperkt tot taken die aan zaken hangen?**

Ja, voor MijnOverheid nu wel. Voor de MijnOmgeving is deze beperking er niet.

**Kunnen taken ook geweigerd worden?**

Nee, voor zover we nu hebben gezien zijn er geen taken die geweigerd kunnen worden.

**Wat gebeurt er als de termijn verstrijkt?**

Niets buiten een notificatie of visuele indicatie.

**Kunnen taken ingetrokken worden?**

Ja. Met label afgerond. De taak wordt niet verwijderd. Is een soort soft delete. Met reden voor intrekken.

**Worden taken altijd in context getoond?**

Ja, behalve in een overzichtspagina zoals Recent, Overzicht of MijnTaken. In zo'n overzicht is de Taak een link naar de context. De omschrijving is wellicht een samengestelde goed leesbare titel.

**Kun je nog iets met een reeds uitgevoerde taak?**

Nee. Dan krijg je de taak opnieuw.

**Kunnen er meer dan 1 taak(en) tegelijkertijd uitgezet zijn voor dezelfde context?**

Ja, waarom niet.

**Hebben alle taken een termijn?**

Nee — maar klopt dit wel?

**Is er een vernietigingsdatum? En is dat afhankelijk van de status?**

De taak is onderdeel van de context en wordt verwijderd als de context verwijderd wordt.

**Wat willen we met uitgevoerde taken? Kun je die terugzien? Is dit contextafhankelijk (m.a.w. kun je bij een product ook zien dat je je betaling hebt uitgevoerd?)**

Ja, dit zit in het UX design. Ook met limieten / filtering op status.

**Kom je na het uitvoeren van een taak altijd terug op de plek waar je deze begon uit te voeren? Dus als je een taak uitvoert bij LO, kom je dan terug bij MO?**

Ja, terug naar waar je gestart bent. In principe wel, tenzij het technisch niet mogelijk zou zijn. Of als uit gebruikersonderzoek iets anders volgt.

**Is er een resultaatscherm? Ook voor negatieve resultaten?**

Ja, er is een apart resultaatscherm. Is onderdeel van het uitvoeren van de taak. Vanaf het resultaatscherm ga je terug naar de contextpagina -- bij voorkeur daar waar je gestart bent.

**Moeten we kijken naar een ondertekentaak / toestemming geven-taak?**

Ja, maar kan voor nu nog buiten scope blijven, maar wel rekening mee houden in het technisch ontwerp. Het is wel een beoogde toepassing van een taak.

**Gaat een taak (behorende bij een zaak) zelfstandig in het "Recent" overzicht getoond worden, of wordt dit weergegeven als een wijziging op een zaak?**

Ja, deze wordt weergegeven maar linkt naar de zaak. Onder de zaak zie je dan de taak.

**Indien de taak zelfstandig wordt weergegeven, is het dan — enkel op basis van de omschrijving — altijd duidelijk genoeg op welke zaak de taak betrekking heeft?**

Voorbeeld: Een burger heeft twee aanvragen voor parkeervergunningen lopen, voor twee verschillende auto's. Twee taken voor het uploaden van een kentekenbewijs worden toegewezen. Is het duidelijk welke taak bij welke vergunningsaanvraag hoort?

Deze taak wordt getoond onder de zaak. Maar de titel van de zaak is niet onderscheidend genoeg.

## Betaling

**Waar keer je naartoe terug als de betaling is uitgevoerd?**

Naar de plek waar je hem begon (in principe).

**Wat voor soorten exception-schermen zijn er (definitief fout, probeer opnieuw)?**

Voor nu definitieve fout en tijdelijke fout.

## Bestandsupload

**Is er een staging fase?**

Wij nemen aan van wel, zie beschrijving hieronder. Je kunt meerdere documenten uploaden.

**Kun je per bestand optionele opmerkingen plaatsen?**

Ja, we nemen aan van wel. Deze functionaliteit zit in de formulierentaak van VTB. Voor MijnOverheid dient uitgewerkt te worden of omschrijvingsvelden oid bij moeten of niet.

**Hoe geven we metadata mee over de bestanden die geupload worden in de taaksessie?**

Dit is ook nog een ontwerpvraag. Informatieobjecttypen kunnen worden toegevoegd.

**Kruisjes naast bestanden die al geüpload zijn om te kunnen verwijderen?**

Ja, lijkt ons van wel.

**Bestand ook nog even in te zien voordat je de taak indient/afrondt?**

Is wel wenselijk.

**Zijn meerdere bestanden uploaden in scope?**

Ja.

**Kun je een overzicht zien van geüploade bestanden? In het scherm van de zaak of andere context?**

Ja, op portalen die dit ondersteunen en MijnOverheid ondersteunt dit nog niet.

**Moet je je in te leveren bestanden kunnen editen (verwijderen en commentaar geven)?**

Ja, zie hierboven.

**Zijn er taken waarbij er maar 1 bestand bij mag?**

Ligt aan het taakpatroon en/of het formulier. Dit wordt belegd vanuit een formulierdefinitie, die nog verder uitgewerkt moet worden.

**Bestandseisen: maximale grootte, formaten, etc.?**

Ja, ook dit moet uit een formulierdefinitie volgen. 0 of meer bestandstypen. Minimale en maximale grootte. Maximaal aantal bestanden. Veld verplicht is of niet. En een extra veld zoals informatieobjecttype.

**Inline foto's uploaden (bijv. met een mobiele telefoon)**

Dit ligt ook aan de formulierdefinitie. Is erg eenvoudig toe te voegen in een mobile-first opzet.

**Hoe dekken we veiligheid/virusscanner af vanuit MijnOverheid?**

Niet, dat doet de ontvanger.

## Technisch

**Moet MO een resultaat kunnen tonen nadat je terug geredirect wordt naar MO (zowel via redirect als cloudevent)?**

Ja, zie ook het sequence diagram voor de upload use case.

**Lossen we CORS op met proxies of anders?**

Nog uit te zoeken.

## Schermen

**Eenvoudige herauthenticatie / DigiD flow**

Dit is terug te vinden op het functioneel ontwerp van DigiD bij Logius.

**Taak volbracht / bevestiging?**

Laat dit lijken op de betaalflow.

**Keer je na het uitvoeren van een taak terug naar de aanroepende applicatie?**

Ja.

Uit te werken schermen, onder andere:

- Als het niet gelukt is om een taak uit te voeren? Popup / modal / non-modal informatie?
- Overzichtsscherm taken (TODO-achtig scherm)
- Bestandsuploadscherm, inclusief commentaar bij bestand(en)
- Flow van formulieren bij gemeente(n)

## Out-of-scope

- Centrale takenlijst / takenregister zoals geïmplementeerd door MijnOverheid

## Technische uitwerking

Groeipad.

## API

**Enum values**

We gebruiken geen enums, maar examples bij strings voor forwards compatibility. Ook voegen we dan enumDescriptions toe. Dit volgt [Zalando API Guideline 112](https://opensource.zalando.com/restful-api-guidelines/#112).

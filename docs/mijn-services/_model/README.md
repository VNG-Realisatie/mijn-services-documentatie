# MijnServices-documentatiemodel

Dit model is uitsluitend bedoeld voor de documentatie van MijnServices. Het
verbindt onderwerpen die op verschillende pagina's terugkomen, zonder een
sitebreed model of pluginregistratie in de Docusaurus-configuratie.

## Logische structuur en eigenaarschap

Het samengevoegde model is de afspraak; bestandsnamen zijn alleen de redactionele
indeling. Alle `.yaml`-bestanden direct in deze map worden automatisch ingelezen
en recursief samengevoegd. Ook in een enkel bestand blijft de structuur leesbaar:

```yaml
begrippen:
  definities: {}
  relaties: {}
  doorsnedes: {}
bouwstenen: {}
usecases: {}
klantscenarios:
  behoeften: {}
  scenarios: {}
```

Deze schets toont de onderdelen; in de echte bronnen staan de items onder hun
stabiele ID. Het begrippenkader groepeert wat de begrippenbeheerder samen beheert:
definities, hun onderlinge relaties en doorsnedes voor diagrammen en tabellen.
Klantscenario's groeperen de behoeften en de concrete uitwerkingen daarvan.

| Huidig bestand    | Beheert deze logische onderdelen                                     |
| ----------------- | -------------------------------------------------------------------- |
| `begrippen.yaml`  | `begrippen.definities`, `begrippen.relaties`, `begrippen.doorsnedes` |
| `bouwstenen.yaml` | `bouwstenen`, `usecases`                                             |
| `scenarios.yaml`  | `klantscenarios.behoeften`, `klantscenarios.scenarios`               |

Ieder gegeven heeft een bron; andere onderwerpen verwijzen via een ID naar die
bron, niet via een bestandsnaam. `kernbegrip: taak` verwijst bijvoorbeeld naar
`begrippen.definities.taak`, en `usecases: [taak-afhandelen]` naar
`usecases.taak-afhandelen`. Wijzig een ID niet alleen om de zichtbare naam te
veranderen. Terugverwijzingen worden afgeleid, niet afzonderlijk onderhouden.

Een bestand kan later verder worden opgesplitst of met een ander worden
samengevoegd. Herhaal bij splitsing de bijbehorende bovenliggende sleutels en
behoud de ID's. Zo mag een nieuw bestand `begrippen.doorsnedes` bijdragen zonder
dat de definities daar ook in moeten staan. Verwijzingen, pagina's en de leeslaag
hoeven daarvoor niet aangepast te worden.

Dubbel gedefinieerde waarden geven een fout met het volledige modelpad, ook als
ze dezelfde waarde hebben. Bronvolgorde bepaalt dus niet welke waarde wint.
Lijsten zijn complete waarden: de merge plakt ze niet aan elkaar en bepaalt
geen nieuwe stap- of diagramvolgorde.

Gebruik twee spaties inspringing. Met `>-` kun je een definitie of behoefte over
meerdere regels schrijven; de weergave maakt daar een doorlopende zin van.

## Wat blijft buiten het model?

Markdown blijft de bron voor verhalen, context, uitleg, voorbeelden en de
inhoudelijke uitwerking van use cases. Frontmatter bevat alleen pagina- en
publicatiegegevens, zoals `draft`, de beschrijving en de sidebarpositie.

OpenAPI-specificaties blijven zelfstandige technische contracten, met eigen
operaties, schema's en constraints. Het documentatiemodel vervangt ze niet.
Eventueel kan later documentatietekst automatisch als kopie naar een specificatie
worden overgenomen, met dit model als bron. Die synchronisatie is niet gebouwd.
Ook de koppeling voorbij schermprofielen naar API's en aansluitprofielen is nog
niet gemodelleerd.

## Eerste aangesloten pagina's

- MijnZaken heeft een gegenereerd diagram en tabel naast het handgeschreven
  origineel. Diagram- en tabelselecties blijven voorlopig afzonderlijk vastgelegd.
- Ontbrekende informatie aanleveren gebruikt het model voor behoefte, doel,
  stapnamen, verwachtingen en verwijzingen naar MijnTaken, MijnZaken en schermen.
  De eerdere `scenario`-frontmatter en het bijbehorende JSON Schema zijn vervallen.

Bij een bouwsteenpagina:

```mdx
import ModelWeergave from "../../_model/ModelWeergave";

<ModelWeergave weergave="mijn-zaken" />
```

Bij een scenariopagina:

```mdx
import { ScenarioDoel, ScenarioStap, UsecaseLink } from "../_model/Scenario";

<ScenarioDoel scenario="SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN" />

<ScenarioStap scenario="SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN" stap="informatie-aanleveren">

Het verhaal bij deze stap blijft Markdown.

Dit wordt ondersteund door <UsecaseLink id="taak-afhandelen" />.

</ScenarioStap>
```

De pagina plaatst de stappen expliciet. De modeltest controleert dat deze volgorde
en selectie bij het scenario passen. Use cases worden met `UsecaseLink` in het
verhaal verbonden aan de handeling; de naam en bestemming komen uit het model.
De test controleert dat deze links overeenkomen met de use cases van de stap.
Een stap kan via `onlineUitwerking` een korte toelichting tonen na de verwachtingen,
met het label 'In een mijnomgeving'. Gebruik daarin `SchermLink` met een `document`
en eventueel een leesbare linktekst. De component haalt de bestemming en het
eventuele annotatie-anker uit de schermverwijzingen van de huidige stap en weigert
schermen die niet aan die stap gekoppeld zijn. Er is geen losse linklijst of inklapper.
`ScenarioGebruik` kan de terugverwijzingen
voor een use case tonen; de bouwsteenpagina's gebruiken dit nog niet.

## Techniek en controles

`model.ts` ontdekt alle lokale `.yaml`-bronnen via de bestaande Webpack/Rspack-
contextimport en roept daarbij `loader.cjs` rechtstreeks aan. `merge.ts` voegt
de bijdragen samen voordat `validation.ts` de relaties controleert. De parser
draait tijdens het bouwen, niet in de browser. Andere YAML-bestanden buiten
deze map en de generieke configuratie blijven ongemoeid.

Dubbele YAML-sleutels worden afgekeurd. De gezamenlijke leeslaag controleert
interne verwijzingen, dubbele selecties, kernbegrippen, relatie-eindpunten en
unieke stap-/verwachtingsankers. Schermlinks gebruiken de bestaande document-ID's
en Docusaurus-routes. Een ontbrekend doeldocument geeft een weergavefout.

Voer de gerichte tests vanuit de repository-root uit:

```sh
node --test docs/mijn-services/_model/model.test.cjs
```

Dit is nog geen volledig YAML-schema. Onbekende velden en alle mogelijke
structuurfouten worden niet systematisch gevalideerd. Bestaande doelankers en de
betekenis van relaties vragen ook review en browsercontrole.

## Bewuste afwijkingen in het MijnZaken-diagram

- Het technische alias `ENKINFOOBJ` heet in het model `informatieobject`.
- De losse BERICHT-link is niet overgenomen: het begrip staat niet in dit diagram.
- PLAN blijft aanwezig, maar zonder link naar de niet-bestaande MijnPlannen-pagina.
- Links naar bestaande bouwstenen werken ook onder de deployment-prefix.

De bestaande definities zijn letterlijk overgenomen, inclusief formuleringen
die eventueel nog inhoudelijke herziening vragen.

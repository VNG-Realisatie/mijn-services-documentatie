const assert = require("node:assert/strict");
const { readFileSync, readdirSync, existsSync } = require("node:fs");
const path = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");
const ts = require("typescript");
const { parse } = require("yaml");
const loader = require("./loader.cjs");

function compile(file, dependencies = {}, sources = {}) {
  const output = ts.transpileModule(
    readFileSync(path.join(__dirname, file), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    },
  ).outputText;
  const exports = {};
  const importModule = (id) => {
    assert.ok(Object.hasOwn(dependencies, id), `Onverwachte import '${id}'`);
    return dependencies[id];
  };
  importModule.context = (directory, recursive, pattern) => {
    assert.equal(directory, "!!./loader.cjs!.");
    assert.equal(recursive, false);
    const context = (id) => sources[id];
    context.keys = () => Object.keys(sources).filter((id) => pattern.test(id));
    return context;
  };
  vm.runInNewContext(output, {
    exports,
    structuredClone,
    require: importModule,
  });
  return exports;
}

const validation = compile("validation.ts");
const { voegSamen } = compile("merge.ts");

test("modelstructuur is onafhankelijk van splitsing en bronvolgorde", () => {
  const definities = { begrippen: { definities: { taak: { naam: "Taak" } } } };
  const relaties = {
    begrippen: { relaties: { taakZaak: { van: "taak", naar: "zaak" } } },
  };
  const volledig = {
    begrippen: { ...definities.begrippen, ...relaties.begrippen },
  };
  const normalize = (value) => JSON.parse(JSON.stringify(value));
  assert.deepEqual(normalize(voegSamen(definities, relaties)), volledig);
  assert.deepEqual(normalize(voegSamen(relaties, definities)), volledig);
  assert.deepEqual(normalize(voegSamen(volledig)), volledig);
  assert.deepEqual(definities, {
    begrippen: { definities: { taak: { naam: "Taak" } } },
  });
});

test("dubbele definities worden niet stilzwijgend overschreven of samengevoegd", () => {
  const bron = { begrippen: { definities: { taak: { naam: "Taak" } } } };
  assert.throws(
    () => voegSamen(bron, bron),
    /dubbele definitie van 'begrippen.definities.taak.naam'/,
  );
  assert.throws(
    () => voegSamen({ stappen: ["eerste"] }, { stappen: ["tweede"] }),
    /dubbele definitie van 'stappen'/,
  );
  assert.throws(() => voegSamen(["ongeldige bron"]), /moet een object zijn/);
});

function readSources() {
  return Object.fromEntries(
    readdirSync(__dirname)
      .filter((name) => name.endsWith(".yaml"))
      .map((name) => [
        `./${name}`,
        parse(readFileSync(path.join(__dirname, name), "utf8")),
      ]),
  );
}

function readModel() {
  return voegSamen(...Object.values(readSources()));
}

function loadApi() {
  return compile(
    "model.ts",
    { "./merge": { voegSamen }, "./validation": validation },
    readSources(),
  );
}

test("dezelfde echte gegevens werken als een bestand of als opgesplitste bijdragen", () => {
  const model = readModel();
  const dependencies = { "./merge": { voegSamen }, "./validation": validation };
  const volledig = compile("model.ts", dependencies, { "./alles.yaml": model });
  const gesplitst = compile("model.ts", dependencies, {
    "./definities.yaml": {
      begrippen: { definities: model.begrippen.definities },
    },
    "./diagrammen.yaml": {
      begrippen: {
        relaties: model.begrippen.relaties,
        doorsnedes: model.begrippen.doorsnedes,
      },
    },
    "./overig.yaml": {
      bouwstenen: model.bouwstenen,
      usecases: model.usecases,
      klantscenarios: model.klantscenarios,
    },
  });
  assert.equal(
    JSON.stringify(volledig.default),
    JSON.stringify(gesplitst.default),
  );
  assert.equal(
    volledig.maakDiagram("mijn-zaken", (pad) => pad),
    gesplitst.maakDiagram("mijn-zaken", (pad) => pad),
  );
  assert.equal(
    gesplitst.getGebruik("taak-afhandelen")[0].stap.id,
    "informatie-aanleveren",
  );
});

test("alle bronnen zijn geldig en de use case verbindt scenario en bouwsteen", () => {
  const api = loadApi();
  assert.equal(
    api.getScenario("SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN").stappen.length,
    2,
  );
  assert.equal(api.getUsecase("taak-afhandelen").bouwsteen, "mijn-taken");
  const gebruik = api.getGebruik("taak-afhandelen");
  assert.equal(gebruik.length, 1);
  assert.equal(gebruik[0].stap.id, "informatie-aanleveren");
  assert.throws(() => api.getScenario("ontbreekt"), /onbekende scenario/);
  assert.throws(
    () => api.getStap("SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN", "ontbreekt"),
    /onbekende stap/,
  );
});

test("use-casecodes zijn uniek en modelankers wijzen naar de juiste bouwsteen", () => {
  const codes = new Map();
  for (const [bouwsteen, prefix] of Object.entries({
    "mijn-zaken": "ZKN",
    "mijn-taken": "TKN",
    "mijn-berichten": "BRH",
    "mijn-agenda": "AGD",
  })) {
    const source = readFileSync(
      path.join(__dirname, "../bouwstenen", bouwsteen, "index.md"),
      "utf8",
    );
    const headings = source.match(/^### UC-.*$/gm) ?? [];
    assert.ok(headings.length > 0, bouwsteen);
    assert.doesNotMatch(source, /\{\/_/);
    for (const heading of headings) {
      const match = heading.match(/^### (UC-([A-Z]{3})-\d{2,}): .+$/);
      assert.ok(match, heading);
      const [, code, bouwsteencode] = match;
      const anker = code.toLowerCase();
      assert.equal(bouwsteencode, prefix);
      assert.ok(source.includes(`<span id="${anker}" />\n\n${heading}`), code);
      assert.equal(source.split(`<span id="${anker}" />`).length - 1, 1, code);
      assert.equal(codes.has(anker), false, code);
      codes.set(anker, bouwsteen);
    }
  }
  for (const usecase of Object.values(readModel().usecases)) {
    assert.equal(codes.get(usecase.anker), usecase.bouwsteen, usecase.naam);
  }
});

test("MijnZaken behoudt 14 begrippen, 14 relaties en links met deployment-prefix", () => {
  const diagram = loadApi().maakDiagram("mijn-zaken", (pad) => `/test${pad}`);
  assert.equal(
    diagram.split("\n").filter((line) => line.startsWith("class ")).length,
    14,
  );
  assert.equal(
    diagram.split("\n").filter((line) => line.includes(" --> ")).length,
    14,
  );
  assert.ok(
    diagram.includes(
      '"/test/initiatieven/mijn-services/bouwstenen/mijn-zaken/"',
    ),
  );
});

test("de lokale loader exporteert YAML als module en weigert dubbele sleutels", () => {
  const context = { module: { exports: {} } };
  vm.runInNewContext(loader("taak:\n  naam: Taak\n"), context);
  assert.equal(context.module.exports.taak.naam, "Taak");
  assert.throws(() => loader("taak: x\ntaak: y\n"), /Map keys must be unique/);
});

test("onbekende verwijzingen worden afgekeurd", () => {
  for (const [collection, field, message] of [
    [["bouwstenen"], "kernbegrip", /kernbegrip/],
    [["usecases"], "bouwsteen", /onbekende bouwsteen/],
    [["begrippen", "relaties"], "naar", /onbekende begrip/],
    [["klantscenarios", "scenarios"], "behoefte", /onbekende behoefte/],
  ]) {
    const model = readModel();
    const items = collection.reduce((node, key) => node[key], model);
    Object.values(items)[0][field] = "ontbreekt";
    assert.throws(() => validation.validateModel(model), message);
  }
  const model = readModel();
  model.klantscenarios.scenarios[
    "SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN"
  ].stappen[0].usecases.push("ontbreekt");
  assert.throws(() => validation.validateModel(model), /onbekende use case/);
});

test("dubbele selecties en relaties buiten het diagram worden afgekeurd", () => {
  const model = readModel();
  model.begrippen.doorsnedes["mijn-zaken"].tabel.push("zaak");
  assert.throws(() => validation.validateModel(model), /dubbele ID/);
  model.begrippen.doorsnedes["mijn-zaken"].tabel.pop();
  model.begrippen.doorsnedes["mijn-zaken"].diagram = ["zaak"];
  assert.throws(
    () => validation.validateModel(model),
    /verwijst buiten diagram/,
  );
});

test("stappen en verwachtingen delen een unieke ankerruimte", () => {
  const model = readModel();
  const scenario =
    model.klantscenarios.scenarios["SCN-ONTBREKENDE-INFORMATIE-AANLEVEREN"];
  scenario.stappen[0].verwachtingen[0].id = scenario.stappen[1].id;
  assert.throws(
    () => validation.validateModel(model),
    /ongeldig of dubbel anker/,
  );
});

test("scenariopagina verwijst in modelvolgorde naar stappen, zonder oude frontmatter", () => {
  const model = readModel();
  for (const [id, scenario] of Object.entries(model.klantscenarios.scenarios)) {
    const documentPath = path.resolve(
      __dirname,
      "../..",
      `${scenario.document}.md`,
    );
    const source = readFileSync(documentPath, "utf8");
    assert.equal(
      Object.hasOwn(parse(source.split("---")[1]), "scenario"),
      false,
    );
    const calls = [
      ...source.matchAll(
        /<ScenarioStap\s+scenario="([^"]+)"\s+stap="([^"]+)"/g,
      ),
    ];
    assert.deepEqual(
      calls.map((match) => [match[1], match[2]]),
      scenario.stappen.map((stap) => [id, stap.id]),
    );
    for (const call of calls) {
      const body = source.slice(call.index).split("</ScenarioStap>")[0];
      const verwijzingen = [
        ...body.matchAll(/<UsecaseLink\s+id="([^"]+)"/g),
      ].map((match) => match[1]);
      const stap = scenario.stappen.find((item) => item.id === call[2]);
      assert.deepEqual(
        [...new Set(verwijzingen)].sort(),
        [...stap.usecases].sort(),
        `Use-caselinks en model verschillen bij '${stap.id}'`,
      );
      const schermverwijzingen = [
        ...body.matchAll(/<SchermLink\s+document="([^"]+)"/g),
      ].map((match) => match[1]);
      assert.deepEqual(
        [...new Set(schermverwijzingen)].sort(),
        stap.schermen.map((scherm) => scherm.document).sort(),
        `Schermlinks en model verschillen bij '${stap.id}'`,
      );
    }
    for (const stap of scenario.stappen) {
      for (const scherm of stap.schermen) {
        const base = path.resolve(__dirname, "../..", scherm.document);
        assert.ok(
          [".md", ".mdx"].some((extension) => existsSync(base + extension)),
          scherm.document,
        );
      }
    }
  }
});

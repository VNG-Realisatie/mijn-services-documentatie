import type {Model} from './types';
import {voegSamen} from './merge';
import {validateModel, zoek} from './validation';

declare const require: {
  context(directory: string, recursive: boolean, pattern: RegExp): {
    (id: string): unknown;
    keys(): string[];
  };
};

const bronnen = require.context('!!./loader.cjs!.', false, /\.yaml$/);
const model = voegSamen(...bronnen.keys().sort().map((id) => bronnen(id))) as Model;
validateModel(model);

export function getWeergave(id: string) {
  return zoek(model.begrippen.doorsnedes, id, 'weergave');
}

export function getBouwsteen(begrip: string) {
  return Object.values(model.bouwstenen).find((bouwsteen) => bouwsteen.kernbegrip === begrip);
}

export function getBouwsteenById(id: string) {
  return zoek(model.bouwstenen, id, 'bouwsteen');
}

export function getUsecase(id: string) {
  return zoek(model.usecases, id, 'use case');
}

export function getScenario(id: string) {
  return zoek(model.klantscenarios.scenarios, id, 'scenario');
}

export function getStap(scenarioId: string, stapId: string) {
  const stap = getScenario(scenarioId).stappen.find((item) => item.id === stapId);
  if (!stap) {
    throw new Error(`MijnServices-model: onbekende stap '${stapId}' in '${scenarioId}'.`);
  }
  return stap;
}

export function getGebruik(usecaseId: string) {
  getUsecase(usecaseId);
  return Object.keys(model.klantscenarios.scenarios).flatMap((id) => {
    const scenario = getScenario(id);
    return scenario.stappen
      .filter((stap) => stap.usecases.includes(usecaseId))
      .map((stap) => ({scenario: id, document: scenario.document, stap}));
  });
}

export function maakDiagram(id: string, url: (pad: string) => string) {
  const weergave = getWeergave(id);
  const nodeId = (begrip: string) => {
    if (!/^[a-z][a-z0-9-]*$/.test(begrip)) {
      throw new Error(`MijnServices-model: ongeldige begrip-ID '${begrip}'.`);
    }
    return begrip.replaceAll('-', '_');
  };
  const regels = [
    '---',
    'config:',
    '  layout: elk',
    '  class:',
    '    hideEmptyMembersBox: true',
    '---',
    'classDiagram',
    'direction TB',
  ];

  for (const begrip of weergave.diagram) {
    regels.push(`class ${nodeId(begrip)}[${JSON.stringify(model.begrippen.definities[begrip].naam)}]`);
  }
  for (const begrip of weergave.diagram) {
    const bouwsteen = getBouwsteen(begrip);
    if (bouwsteen) {
      regels.push(`link ${nodeId(begrip)} ${JSON.stringify(url(bouwsteen.pagina))} ${JSON.stringify(`Ga naar ${bouwsteen.naam}`)}`);
    }
  }
  for (const relatieId of weergave.relaties) {
    const {van, naar, label} = model.begrippen.relaties[relatieId];
    regels.push(`${nodeId(van)} --> ${nodeId(naar)} : ${label}`);
  }
  return regels.join('\n');
}

export default model;
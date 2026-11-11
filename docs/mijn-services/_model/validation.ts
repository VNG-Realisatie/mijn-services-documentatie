import type {Model} from './types';

export function zoek<Type>(items: Record<string, Type>, id: string, soort: string): Type {
  if (!Object.hasOwn(items, id)) {
    throw new Error(`MijnServices-model: onbekende ${soort} '${id}'.`);
  }
  return items[id];
}

function uniekeSelectie(ids: string[], omschrijving: string) {
  if (new Set(ids).size !== ids.length) {
    throw new Error(`MijnServices-model: dubbele ID in ${omschrijving}.`);
  }
}

export function validateModel(model: Model) {
  for (const [id, bouwsteen] of Object.entries(model.bouwstenen)) {
    zoek(model.begrippen.definities, bouwsteen.kernbegrip, `kernbegrip van '${id}'`);
  }
  for (const usecase of Object.values(model.usecases)) {
    zoek(model.bouwstenen, usecase.bouwsteen, 'bouwsteen');
  }
  for (const relatie of Object.values(model.begrippen.relaties)) {
    zoek(model.begrippen.definities, relatie.van, 'begrip');
    zoek(model.begrippen.definities, relatie.naar, 'begrip');
  }
  for (const [id, weergave] of Object.entries(model.begrippen.doorsnedes)) {
    const bouwsteen = zoek(model.bouwstenen, weergave.bouwsteen, 'bouwsteen');
    if (!weergave.diagram.includes(bouwsteen.kernbegrip)) {
      throw new Error(`MijnServices-model: kernbegrip ontbreekt in '${id}'.`);
    }
    for (const [naam, selectie] of [['diagram', weergave.diagram], ['tabel', weergave.tabel]] as const) {
      uniekeSelectie(selectie, `${naam} van '${id}'`);
      for (const begrip of selectie) {
        zoek(model.begrippen.definities, begrip, 'begrip');
      }
    }
    uniekeSelectie(weergave.relaties, `relaties van '${id}'`);
    for (const relatieId of weergave.relaties) {
      const relatie = zoek(model.begrippen.relaties, relatieId, 'relatie');
      if (![relatie.van, relatie.naar].every((begrip) => weergave.diagram.includes(begrip))) {
        throw new Error(`MijnServices-model: '${relatieId}' verwijst buiten diagram '${id}'.`);
      }
    }
  }
  for (const [id, scenario] of Object.entries(model.klantscenarios.scenarios)) {
    zoek(model.klantscenarios.behoeften, scenario.behoefte, 'behoefte');
    if (!scenario.stappen.length) {
      throw new Error(`MijnServices-model: scenario '${id}' heeft geen stappen.`);
    }
    const ankers = new Set<string>();
    for (const stap of scenario.stappen) {
      for (const anker of [stap.id, ...stap.verwachtingen.map((verwachting) => verwachting.id)]) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(anker) || ankers.has(anker)) {
          throw new Error(`MijnServices-model: ongeldig of dubbel anker '${anker}' in '${id}'.`);
        }
        ankers.add(anker);
      }
      uniekeSelectie(stap.usecases, `use cases van '${stap.id}'`);
      uniekeSelectie(stap.bouwstenen, `bouwstenen van '${stap.id}'`);
      for (const usecase of stap.usecases) {
        zoek(model.usecases, usecase, 'use case');
      }
      for (const bouwsteen of stap.bouwstenen) {
        zoek(model.bouwstenen, bouwsteen, 'bouwsteen');
      }
    }
  }
}
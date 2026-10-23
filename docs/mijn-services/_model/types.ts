export type Stap = {
  id: string;
  naam: string;
  usecases: string[];
  bouwstenen: string[];
  schermen: {document: string; anker?: string}[];
  verwachtingen: {id: string; beschrijving: string}[];
};

export type Scenario = {
  behoefte: string;
  document: string;
  doel: string;
  stappen: Stap[];
};

export type Model = {
  begrippen: {
    definities: Record<string, {naam: string; definitie: string}>;
    relaties: Record<string, {van: string; naar: string; label: string}>;
    doorsnedes: Record<string, {
      bouwsteen: string;
      diagram: string[];
      tabel: string[];
      relaties: string[];
    }>;
  };
  bouwstenen: Record<string, {
    naam: string;
    kernbegrip: string;
    pagina: string;
    icoon: string;
  }>;
  usecases: Record<string, {naam: string; bouwsteen: string; anker: string}>;
  klantscenarios: {
    behoeften: Record<string, {beschrijving: string}>;
    scenarios: Record<string, Scenario>;
  };
};
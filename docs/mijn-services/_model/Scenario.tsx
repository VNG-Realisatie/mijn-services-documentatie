import React, {createContext, useContext, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useDocById, useActivePluginAndVersion} from '@docusaurus/plugin-content-docs/client';
import model, {getBouwsteenById, getUsecase, getGebruik, getScenario, getStap} from './model';
import type {Stap} from './types';

const StapContext = createContext<Stap | null>(null);

function DocumentLink({document, anker, children}: {
  document: string;
  anker?: string;
  children?: ReactNode;
}) {
  const doc = useDocById(document);
  const context = useActivePluginAndVersion();
  const bestemming = context?.activeVersion?.docs.find((item) => item.id === document);
  if (!bestemming) {
    throw new Error(`MijnServices-model: geen documentbestemming voor '${document}'.`);
  }
  return <Link to={`${bestemming.path}${anker ? `#${anker}` : ''}`}>{children ?? doc.title}</Link>;
}

export function UsecaseLink({id}: {id: string}) {
  const usecase = getUsecase(id);
  const bouwsteen = getBouwsteenById(usecase.bouwsteen);
  return <Link to={`${bouwsteen.pagina}#${usecase.anker}`}>{usecase.naam}</Link>;
}

export function SchermLink({document, children}: {document: string; children?: ReactNode}) {
  const stap = useContext(StapContext);
  const scherm = stap?.schermen.find((item) => item.document === document);
  if (!scherm) {
    throw new Error(`MijnServices-model: scherm '${document}' is niet gekoppeld aan de huidige stap.`);
  }
  return <DocumentLink {...scherm}>{children}</DocumentLink>;
}

export function ScenarioDoel({scenario: id}: {scenario: string}) {
  const scenario = getScenario(id);
  return (
    <>
      <p>{model.klantscenarios.behoeften[scenario.behoefte].beschrijving}</p>
      <p><strong>Doel:</strong> {scenario.doel}</p>
    </>
  );
}

export function ScenarioStap({scenario, stap: id, children, onlineUitwerking}: {
  scenario: string;
  stap: string;
  children: ReactNode;
  onlineUitwerking?: ReactNode;
}) {
  const stap = getStap(scenario, id);
  return (
    <StapContext.Provider value={stap}>
      <h3 id={stap.id}>{stap.naam}</h3>
      {children}
      <p style={{marginBottom: 0}}><strong>Verwachtingen</strong></p>
      <ul style={{marginTop: 0}}>
        {stap.verwachtingen.map((verwachting) => (
          <li id={verwachting.id} key={verwachting.id}>
            {verwachting.beschrijving}
          </li>
        ))}
      </ul>
      {onlineUitwerking && (
        <p><strong>In een mijnomgeving</strong><br />{onlineUitwerking}</p>
      )}
    </StapContext.Provider>
  );
}

export function ScenarioGebruik({usecase}: {usecase: string}) {
  const gebruik = getGebruik(usecase);
  if (!gebruik.length) {
    return null;
  }
  return (
    <ul>
      {gebruik.map(({scenario, document, stap}) => (
        <li key={`${scenario}#${stap.id}`}>
          <DocumentLink document={document} anker={stap.id} />: {stap.naam}
        </li>
      ))}
    </ul>
  );
}
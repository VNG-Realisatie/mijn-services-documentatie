import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import openApiSidebar from './docs/mijn-services/interactie-api/referentie/sidebar';

type GeneratedSidebarItem = {
  type: 'category' | 'doc';
  label?: string;
  id?: string;
  className?: string;
  items?: GeneratedSidebarItem[];
  link?: {type: 'generated-index' | 'doc'; title?: string; slug?: string; id?: string};
  [key: string]: unknown;
};

const generatedApiGroups = openApiSidebar as GeneratedSidebarItem[];
const generatedGroup = (label: string) =>
  generatedApiGroups.find(item => item.type === 'category' && item.label === label);
const coreOperations = generatedGroup('Operaties')?.items ?? [];
const coreSchemas = generatedGroup("Schema's")?.items ?? [];
const taskModule = generatedGroup('Taken');
const taskItems = taskModule?.items ?? [];
const taskOperations = taskItems.filter(item => item.type === 'doc' && item.className?.includes('api-method'));
const taskSchemas = taskItems.filter(item => item.type === 'doc' && item.className === 'schema');

const moduleSidebar = [
  {
    type: 'category' as const,
    label: 'Kernmodule',
    items: [
      {type: 'category' as const, label: 'Operaties', items: coreOperations},
      {type: 'category' as const, label: "Schema's", items: coreSchemas},
    ],
  },
  {
    type: 'category' as const,
    label: 'Uitbreidingsmodules',
    items: [
      {
        type: 'category' as const,
        label: 'Taken',
        link: taskModule?.link,
        items: [
          {type: 'category' as const, label: 'Operaties', items: taskOperations},
          {type: 'category' as const, label: "Schema's", items: taskSchemas},
        ],
      },
    ],
  },
];

const isDevelopment = process.env.NODE_ENV !== 'production';
const buildstoneSidebar = isDevelopment
  ? {
      type: 'category' as const,
      label: 'Bouwstenen',
      link: {type: 'doc' as const, id: 'mijn-services/bouwstenen/index'},
      items: [
        {type: 'doc' as const, id: 'mijn-services/bouwstenen/opzet/index'},
        {type: 'doc' as const, id: 'mijn-services/bouwstenen/mijn-zaken/index'},
        {type: 'doc' as const, id: 'mijn-services/bouwstenen/mijn-taken/index'},
        {type: 'doc' as const, id: 'mijn-services/bouwstenen/mijn-berichten/index'},
        {type: 'doc' as const, id: 'mijn-services/bouwstenen/mijn-contactmomenten/index'},
        {type: 'doc' as const, id: 'mijn-services/bouwstenen/mijn-producten/index'},
        {type: 'doc' as const, id: 'mijn-services/bouwstenen/mijn-profiel/index'},
        {type: 'doc' as const, id: 'mijn-services/bouwstenen/mijn-agenda/index'},
        {type: 'doc' as const, id: 'mijn-services/bouwstenen/mijn-gesprekken/index'},
      ],
    }
  : {type: 'doc' as const, id: 'mijn-services/bouwstenen/index', label: 'Bouwstenen'};

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [{
    type: 'category',
    label: 'MijnServices',
    link: {type: 'doc', id: 'mijn-services/index'},
    items: [
      {type: 'doc', id: 'mijn-services/klantreis-en-principes/index'},
      ...(isDevelopment
        ? [{
            type: 'category' as const,
            label: "Klantscenario's",
            link: {type: 'doc' as const, id: 'mijn-services/scenarios/index'},
            items: [
              {type: 'doc' as const, id: 'mijn-services/scenarios/opzet'},
              {type: 'doc' as const, id: 'mijn-services/scenarios/ontbrekende-informatie-aanleveren'},
            ],
          }]
        : []),
      buildstoneSidebar,
      {
        type: 'category',
        label: 'Schermprofielen',
        link: {type: 'doc', id: 'mijn-services/schermprofielen/index'},
        items: [
          {
            type: 'category',
            label: 'Overzicht',
            link: {type: 'doc', id: 'mijn-services/schermprofielen/overzicht/index'},
            items: [
              {type: 'doc', id: 'mijn-services/schermprofielen/overzicht/recent'},
              {type: 'doc', id: 'mijn-services/schermprofielen/overzicht/takenoverzicht'},
            ],
          },
          {
            type: 'category',
            label: 'Context',
            link: {type: 'doc', id: 'mijn-services/schermprofielen/context/index'},
            items: [
              {type: 'doc', id: 'mijn-services/schermprofielen/context/taken-in-context'},
            ],
          },
          {
            type: 'category',
            label: 'Uitvoering',
            link: {type: 'doc', id: 'mijn-services/schermprofielen/uitvoering/index'},
            items: [
              {type: 'doc', id: 'mijn-services/schermprofielen/uitvoering/digid-eenvoudige-herauthenticatie'},
              {type: 'doc', id: 'mijn-services/schermprofielen/uitvoering/taak-uitvoeren'},
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'Interactie API',
        link: {type: 'doc', id: 'mijn-services/interactie-api/index'},
        items: [
          {type: 'doc', id: 'mijn-services/interactie-api/positionering'},
          {type: 'doc', id: 'mijn-services/interactie-api/over-de-portalen-heen'},
          {type: 'doc', id: 'mijn-services/interactie-api/procesoverzicht'},
          ...moduleSidebar,
          ...(process.env.NODE_ENV !== 'production'
            ? [{type: 'doc' as const, id: 'mijn-services/interactie-api/uitgangspunten'}]
            : []),
          {type: 'doc', id: 'mijn-services/interactie-api/vragen'},
        ],
      },
      {
        type: 'category',
        label: 'Aansluitprofielen',
        link: {type: 'doc', id: 'mijn-services/aansluitprofielen/index'},
        items: [
          {type: 'doc', id: 'mijn-services/aansluitprofielen/combinaties'},
          {type: 'doc', id: 'mijn-services/aansluitprofielen/notifynl-api'},
          {type: 'doc', id: 'mijn-services/aansluitprofielen/openvtb-taken-api/index'},
          {type: 'doc', id: 'mijn-services/aansluitprofielen/zgw'},
        ],
      },
      {type: 'doc', id: 'mijn-services/architectuur-en-standaarden/index'},
    ],
  }],
};

export default sidebars;

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from '@docusaurus/types/src/plugin';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid', 'docusaurus-theme-openapi-docs'],
  title: 'MijnServices Documentatie',
  tagline: 'Ontwikkelaarsportaal van de Nederlandse overheid',
  favicon: 'img/logo-don.svg',
  customFields: {
    siteName: 'developer.overheid.nl',
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  noIndex: true,

  // Set the production url of your site here
  url: 'https://vng-realisatie.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/mijn-services-documentatie/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vng-realisatie', // Usually your GitHub org/user name.
  projectName: 'mijn-services-documentatie', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'initiatieven',
          sidebarPath: './sidebars.ts',
          docItemComponent: '@theme/ApiItem',
          editUrl:
            'https://github.com/vng-realisatie/mijn-services-documentatie/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'classic',
        config: {
          interactieservicesApi: {
            specPath: 'docs/mijn-services/specificaties/interactieservices-api/v0.1/openapi.yaml',
            outputDir: 'docs/mijn-services/specificaties/interactieservices-api/referentie',
            showSchemas: true,
            sidebarOptions: {
              groupPathsBy: 'tag',
              categoryLinkSource: 'tag',
            },
          } satisfies OpenApiPlugin.Options,
        },
      } satisfies Plugin.PluginOptions,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      items: [
        {
          to: '/initiatieven',
          label: 'Initiatieven',
          position: 'left',
        },
        {
          href: 'https://github.com/vng-realisatie/mijn-services-documentatie',
          'aria-label': 'GitHub repository',
          className: 'navbar__icon-link',
          html: `<svg aria-hidden="true" height="24" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true" class="octicon octicon-mark-github">
            <path fill="CurrentColor" d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
          </svg>`,
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentatie',
          items: [
            {
              label: 'MijnServices Overzicht',
              to: '/initiatieven/mijn-services',
            },
            {
              label: 'Bouwstenen',
              to: '/initiatieven/mijn-services/bouwstenen',
            },
            {
              label: 'Aansluitprofielen',
              to: '/initiatieven/mijn-services/aansluitprofielen',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'developer.overheid.nl',
              href: 'https://developer.overheid.nl',
            },
            {
              label: 'NL Design System',
              href: 'https://nldesignsystem.nl',
            },
            {
              label: 'Gebruiker Centraal',
              href: 'https://www.gebruikercentraal.nl',
            },
          ],
        },
        {
          title: 'Links',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/vng-realisatie/mijn-services-documentatie',
            },
          ],
        },
      ],
      copyright: `MijnServices • VNG Realisatie`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

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
  tagline: 'Standaarden en interactielaag voor overheidsdienstverlening',
  favicon: 'img/logo-don.svg',
  customFields: {
    siteName: 'developer.overheid.nl',
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

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
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
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
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api-docs',
        routeBasePath: 'api',
        sidebarPath: './api-sidebars.ts',
        docItemComponent: '@theme/ApiItem',
      },
    ],
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: 'api',
        config: {
          'mijn-taken': {
            specPath: 'specs/interactieservices.openapi.yaml',
            outputDir: 'api-docs',
            downloadUrl: 'https://raw.githubusercontent.com/VNG-Realisatie/mijn-taken-api/main/specs/interactieservices.openapi.yaml',
            showExtensions: true,
            showSchemas: true,
            sidebarOptions: {
              groupPathsBy: 'tag',
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
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'MijnServices',
      logo: {
        alt: 'MijnServices Documentatie',
        src: 'img/logo-don.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Kennisbank & Services',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          docsPluginId: 'api',
          position: 'left',
          label: 'Interactieservices API',
        },
        {
          href: 'https://github.com/vng-realisatie/mijn-services-documentatie',
          label: 'GitHub',
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
              to: '/docs/mijn-services',
            },
            {
              label: 'Bouwstenen',
              to: '/docs/mijn-services/bouwstenen',
            },
            {
              label: 'Aansluitprofielen',
              to: '/docs/mijn-services/aansluitprofielen',
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
      copyright: `Aanlever-repository voor developer.overheid.nl • VNG Realisatie`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

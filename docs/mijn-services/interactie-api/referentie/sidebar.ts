import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Operaties",
      link: {
        type: "generated-index",
        title: "Operaties",
        slug: "/category/mijn-services/interactie-api/referentie/operaties",
      },
      items: [
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/zoek-context",
          label: "Zoek context",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Schema's",
      link: {
        type: "generated-index",
        title: "Schema's",
        slug: "/category/mijn-services/interactie-api/referentie/schemas",
      },
      items: [
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/contextquery",
          label: "ContextQuery",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/contextresultaat",
          label: "ContextResultaat",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/contextlink",
          label: "ContextLink",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/probleem",
          label: "Probleem",
          className: "schema",
        },
      ],
    },
    {
      type: "category",
      label: "Taken",
      link: {
        type: "generated-index",
        title: "Taken",
        slug: "/category/mijn-services/interactie-api/referentie/taken",
      },
      items: [
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/uitvoeringinfo",
          label: "UitvoeringInfo",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/uitvoering",
          label: "Uitvoering",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/uploaduitvoering",
          label: "UploadUitvoering",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/formulieruitvoering",
          label: "FormulierUitvoering",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/betaaluitvoering",
          label: "BetaalUitvoering",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/onbekendeuitvoering",
          label: "OnbekendeUitvoering",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/taakinfo",
          label: "TaakInfo",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/schemas/taak",
          label: "Taak",
          className: "schema",
        },
        {
          type: "doc",
          id: "mijn-services/interactie-api/referentie/retrieve-taak",
          label: "Haal één taak op",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;

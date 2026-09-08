module.exports = function openApiDocsWebpackAlias() {
  return {
    name: "openapi-docs-webpack-alias",
    configureWebpack() {
      return {
        resolve: {
          alias: {
            "docusaurus-plugin-openapi-docs/src/openapi/createSchemaExample": require.resolve(
              "docusaurus-plugin-openapi-docs/lib/openapi/createSchemaExample",
            ),
            "docusaurus-plugin-openapi-docs/src/openapi/createSchemaExample.ts": require.resolve(
              "docusaurus-plugin-openapi-docs/lib/openapi/createSchemaExample",
            ),
          },
          fallback: {
            path: require.resolve("path-browserify"),
          },
        },
      };
    },
  };
};
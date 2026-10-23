const { parse } = require("yaml");

module.exports = function modelLoader(source) {
  return `module.exports = ${JSON.stringify(parse(source))};`;
};

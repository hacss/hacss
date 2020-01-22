const rules = require("./rules.js");
const scopes = require("./scopes.js");

module.exports = {
  globalMapArg: x => x,
  rules,
  scopes,
  direction: "LTR",
};

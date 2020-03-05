const {
  applyTo,
  equals,
  ifElse,
  identity,
  mergeDeepRight,
  pipe,
  type,
} = require("ramda");
const rules = require("./rules.js");
const scopes = require("./scopes.js");

const defaultConfig = {
  globalMapArg: identity,
  globalMapOutput: identity,
  rules,
  scopes,
};

const customConfig = pipe(
  ifElse(pipe(type, equals("Function")), applyTo(defaultConfig), identity),
  mergeDeepRight(defaultConfig),
);

module.exports = { customConfig, defaultConfig };

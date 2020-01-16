const { scopes, rules } = require("../config.js"); // When installed via NPM, require("hacss/config") instead.

exports.scopes = scopes;

exports.rules = {
  ...rules,
  Tstk: (size, color) => `
    text-shadow:
      -${size} -${size} 0 ${color},
      ${size} -${size} 0 ${color},
      -${size} ${size} 0 ${color},
      ${size} ${size} 0 ${color}
    ;
  `,
};

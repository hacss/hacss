const config = require("../config/index.js"); // When installed via NPM, require("hacss/config") instead.
const { color, mapArgs } = require("../config/utils.js");

module.exports = {
  ...config,
  rules: {
    ...config.rules,
    Tstk: mapArgs([null, color], (size, color) => `
      text-shadow:
        -${size} -${size} 0 ${color},
        ${size} -${size} 0 ${color},
        -${size} ${size} 0 ${color},
        ${size} ${size} 0 ${color}
      ;
    `),
  },
};

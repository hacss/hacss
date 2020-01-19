const { color, mapArgs } = require("../config/utils.js");

module.exports = {
  rules: {
    Tstk: mapArgs((size, color) => `
      text-shadow:
        -${size} -${size} 0 ${color},
        ${size} -${size} 0 ${color},
        -${size} ${size} 0 ${color},
        ${size} ${size} 0 ${color}
      ;
    `, x => x, color),
  },
};

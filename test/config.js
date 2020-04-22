const globalVariables = require("../plugins/global-variables.js");
const indexedVariables = require("../plugins/indexed-variables.js");

module.exports = {
  mediaQueries: {
    "medium": "only screen and (min-width: 600px) and (max-width: 1199px)",
    "large": "only screen and (min-width: 1200px)",
  },
  plugins: [
    globalVariables({
      "sans-serif": "'Roboto', sans-serif",
    }),
    indexedVariables({
      "font-size": {
        medium: "16px",
        "medium-plus": "20px",
        large: "28px",
        "extra-large": "40px",
      },
    }),
  ],
};

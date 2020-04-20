const globalVariables = require("../plugins/global-variables.js");
const indexedVariables = require("../plugins/indexed-variables.js");

module.exports = {
  mediaQueries: {
    "small": "only screen and (max-width: 599px)",
    "medium": "only screen and (min-width: 600px) and (max-width: 1000px)",
    "large": "only screen and (min-width: 1000px)",
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
    [
      decls => {
        if ("text-stroke" in decls) {
          const [ size, color ] = decls["text-stroke"].split(/\s+/);
          if (size && color) {
            decls["text-shadow"] = `
              -${size} -${size} 0 ${color},
              ${size} -${size} 0 ${color},
              -${size} ${size} 0 ${color},
              ${size} ${size} 0 ${color}
            `;
            delete decls["text-stroke"];
          }
        }
        return decls;
      },
      ["text-stroke"],
    ],
  ],
};

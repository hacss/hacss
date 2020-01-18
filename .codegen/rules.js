const prettier = require("prettier");
const commonMaps = require("../config/common-maps.js");

const atomizer = {
  colors: require("atomizer/src/colors.js"),
  rules: require("atomizer/src/rules.js"),
};

const argName = i => "abcdefghij"[i];

const countArgs = css =>
  !css.includes("$0")
    ? 0
    : 1 + Math.max.apply(
        null,
        css
          .match(/\$[0-9]/g)
          .map(i => parseInt(i.substring(1)))
      );

const genArgs = css => {
  const n = countArgs(css);

  return n === 1
    ? "a"
    : `(${Array.from(Array(n).keys()).map(argName).join(",")})`
    ;
};

const stringifyStyles = o => Object.entries(o).map(([k, v]) => `${k}: ${v}`).join("; ");

const argMapFn = arg => {
  if (arg === atomizer.colors) {
    return "color";
  }

  const commonMap = Object.entries(commonMaps)
    .filter(([k, v]) => {
      if (Object.keys(v).length !== Object.keys(arg).length) {
        return false;
      }

      for (var key in arg) {
        if (arg[key] !== v[key]) {
          return false;
        }
      }

      return true;
    })
    .map(([k]) => k);

  if (commonMap.length) {
    return `lookup(${commonMap[0]})`;
  }

  return `lookup(${JSON.stringify(arg).replace(/("[^"]+":)/g, x => x.substring(1, x.length - 2) + ":")})`;
};

const rewriteRule = ({ matcher, styles, arguments: args }) => {
  const css = stringifyStyles(styles);

  const f = `${genArgs(css)} => \`${css.replace(/\$[0-9]/g, i => "${" + argName(i.substring(1)) + "}")}\``;

  if (args && args.length) {
    return `${matcher}: mapArgs(${f}, ${args.map(argMapFn).join(", ")}),`;
  }

  return `${matcher}: ${f},`;
};

const exclude = [
  "Anim",
  "Bdx",
  "Bdy",
  "Bdt",
  "Bdend",
  "Bdb",
  "Bdstart",
];

process.stdout.write(prettier.format(`
const { borderStyles, borderWidths, overflow, transformOrPerspectiveOrigin } = require("./common-maps.js");
const { color, lookup, mapArgs } = require("./utils.js");

module.exports = {
${
  atomizer.rules
    .filter(({ matcher, name }) => !name.includes("deprecated") && !exclude.includes(matcher))
    .map(rewriteRule).join("\n")
}
};`, { parser: "babel", trailingComma: "all" }));

require("CSS.escape");

const prettier = require("prettier");
const postcss = require("postcss");
const nested = require("postcss-nested");

const pseudoClasses = {
  a: "active",
  c: "checked",
  d: "default",
  di: "disabled",
  e: "empty",
  en: "enabled",
  f: "focus",
  fc: "first-child",
  fi: "first",
  fot: "first-of-type",
  fs: "fullscreen",
  fw: "focus-within",
  h: "hover",
  ind: "indeterminate",
  inv: "invalid",
  ir: "in-range",
  l: "left",
  lc: "last-child",
  li: "link",
  lot: "last-of-type",
  o: "optional",
  oc: "only-child",
  oor: "out-of-range",
  oot: "only-of-type",
  r: "right",
  req: "required",
  ro: "read-only",
  rt: "root",
  rw: "read-write",
  s: "scope",
  t: "target",
  va: "valid",
  vi: "visited",
};

const pseudoClassPattern = `\\:(${Object.keys(pseudoClasses).join("|")})`;

const pseudoElements = {
  a: ":after",
  b: ":before",
  fl: ":first-letter",
  fli: ":first-line",
  ph: ":placeholder",
};

const pseudoElementPattern = `\\:{2}(${Object.keys(pseudoElements).join("|")})`;

const pseudos = className =>
  (
    className.match(
      new RegExp(
        `((${pseudoClassPattern})|(${pseudoElementPattern}))(?!(.*[_>+].*))`,
        "g",
      ),
    ) || []
  ).map(pseudo =>
    pseudo.startsWith("::")
      ? `::${pseudoElements[pseudo.substring(2)]}`
      : `:${pseudoClasses[pseudo.substring(1)]}`,
  );

const contextPattern = `[\\w\\-]+(${pseudoClassPattern})?[_>+]`;

const selector = ({ className, context }) => {
  const self = [`.${CSS.escape(className)}`]
    .concat(pseudos(className))
    .join("");
  if (context) {
    const { operator } = context;
    return [
      [`.${context.className.split(":")[0]}`]
        .concat(pseudos(context.className))
        .join(""),
      self,
    ].join(operator === "_" ? " " : ` ${operator} `);
  }
  return self;
};

const hacss = ({ scopes, rules, direction }, code) => {
  const scopePattern = `\\-\\-(${Object.keys(scopes).join("|")})`;

  const styles = code
    .match(
      new RegExp(
        `(?<=\\W)(${contextPattern})?(${Object.entries(rules)
          .map(function mkPattern([k, v]) {
            switch (typeof v) {
              case "string":
                return `${k}(?!\\()(?=\\W)`;
              case "function":
                return `${k}\\([^\\)]+\\)`;
              case "object":
                return v.map(item => mkPattern([k, item]));
                return null;
            }
          })
          .filter(x => x)
          .reduce((patterns, x) => patterns.concat(x), [])
          .map(
            pattern =>
              `(${pattern}((${pseudoClassPattern}|${pseudoElementPattern})*))`,
          )
          .reduce(
            (pattern, subpattern) =>
              pattern ? `${pattern}|${subpattern}` : subpattern,
            "",
          )})(${scopePattern})?`,
        "g",
      ),
    )
    .reduce((xs, x) => (xs.includes(x) ? xs : xs.concat(x)), [])
    .map(className => {
      const ruleName = className.match(
        new RegExp(`(${Object.keys(rules).join("|")})((?=\\W)|$)`),
      )[0];
      const namedRule = rules[ruleName];
      const args = className.match(/(?<=[\(,])([^\),]+)/g);
      const rule =
        typeof namedRule !== "object"
          ? namedRule
          : !args
          ? namedRule[0]
          : namedRule[args.length] || namedRule[1];

      const css =
        typeof rule === "function" ? rule.apply(null, args || []) : rule;

      const context =
        (className.match(new RegExp(`^(${contextPattern})`, "g")) || []).map(
          c => ({
            className: c.substring(0, c.length - 1),
            operator: c.substring(c.length - 1),
          }),
        )[0] || null;

      const scope = (
        className.match(new RegExp(`(${scopePattern})$`, "g")) || ["--default"]
      ).map(x => x.substring(2))[0];

      return { scope, context, className, css };
    })
    .map(styleDef => [
      styleDef.scope,
      postcss([nested]).process(`${selector(styleDef)} { ${styleDef.css} }`).css,
    ]);

  const stylesheet = Object.entries(
    styles.reduce(
      (groups, [g, s]) => ({
        ...groups,
        [g]: (groups[g] || []).concat(s),
      }),
      {},
    ),
  )
    .sort(([a], [b]) => (a === "default" ? -1 : b === "default" ? 1 : 0))
    .map(([scope, styles]) => scopes[scope](styles.join(" ")))
    .join(" ")
    .replace(/__START__/g, direction === "RTL" ? "right" : "left")
    .replace(/__END__/g, direction === "RTL" ? "left" : "right");

  return prettier.format(stylesheet, { parser: "css" });
};

module.exports = hacss;

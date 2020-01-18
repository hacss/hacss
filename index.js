require("CSS.escape");

const prettier = require("prettier");

const pseudoClasses = {
  f: "focus",
  h: "hover",
};

const pseudoClassPattern = `\\:(${Object.keys(pseudoClasses).join("|")})`;

const pseudoElements = {
  ph: "placeholder",
};

const pseudoElementPattern = `\\:{2}(${Object.keys(pseudoElements).join("|")})`;

const pseudos = className =>
  (className.match(new RegExp(`((${pseudoClassPattern})|(${pseudoElementPattern}))(?!(.*[_>+].*))`, "g")) || [])
    .map(pseudo =>
      pseudo.startsWith("::")
        ? `::${pseudoElements[pseudo.substring(2)]}`
        : `:${pseudoClasses[pseudo.substring(1)]}`
    );

const contextPattern = `[\\w\\-]+(${pseudoClassPattern})?[_>+]`;

const selector = ({ className, context }) => {
  const self = [`.${CSS.escape(className)}`].concat(pseudos(className)).join("");
  if (context) {
    const { operator } = context;
    return [
      [`.${context.className.split(":")[0]}`].concat(pseudos(context.className)).join(""),
      self
    ].join(operator === "_" ? " " : ` ${operator} `);
  }
  return self;
};

const hacss = ({ scopes, rules, context }, code) => {
  const scopePattern = `\\-\\-(${Object.keys(scopes).join("|")})`;

  const styles =
    code
      .match(
        new RegExp(
          `(?<=\\W)(${contextPattern})?(${
            Object
              .entries(rules)
              .map(function mkPattern([k, v]) {
                switch (typeof v) {
                  case "string":
                    return `${k}(?!\\()(?=\\W)`;
                  case "function":
                    return `${k}\\([^\\)]+\\)`;
                  case "object":
                    return v.map(item => mkPattern([k, item])).join(")|(");
                  return "";
                }
              })
              .map(pattern => `(${pattern}((${pseudoClassPattern}|${pseudoElementPattern})*))`)
              .reduce((pattern, subpattern) => pattern ? `${pattern}|${subpattern}` : subpattern, "")
          })(${scopePattern})?`,
          "g"
        )
      )
      .reduce((xs, x) => xs.includes(x) ? xs : xs.concat(x), [])
      .map(className => {
        const ruleName = className.match(new RegExp(`(${Object.keys(rules).join("|")})((?=\\W)|$)`))[0];
        const namedRule = rules[ruleName];
        const args = className.match(/(?<=[\(,])([^\),]+)/g);
        const rule =
          typeof namedRule !== "object"
            ? namedRule
            : !args
                ? namedRule[0]
                : (namedRule[args.length] || namedRule[1]);

        const css = typeof rule === "function" ? rule.apply(null, args || []) : rule;

        const context = (className.match(new RegExp(`^(${contextPattern})`, "g")) || []).map(c => ({
          className: c.substring(0, c.length - 1),
          operator: c.substring(c.length - 1),
        }))[0] || null;

        const scope =
          (className.match(new RegExp(`(${scopePattern})$`, "g")) || ["--default"])
            .map(x => x.substring(2))[0];

        return { scope, context, className, css };
      })
      .map(style => {
        const { scope, css } = style;
        const sel = selector(style);

        const nested = css.match(/&(?=:)[^\{]+[^\}]*\}/g) || [];

        return [
          scope,
          [`& { ${nested.reduce((css, nested) => css.replace(nested, ""), css)} }`]
            .concat(nested.map(x => x.trim()))
            .map(x => `${x.replace(/(^&|(&(?=:)))/g, sel)}`)
            .join(" ")
        ];
      });

  const stylesheet =
    Object
      .entries(
        styles.reduce((groups, [g, s]) => ({
            ...groups,
            [g]: (groups[g] || []).concat(s),
          }), {})
      )
      .sort(([a], [b]) => a === "default" ? -1 : b === "default" ? 1 : 0)
      .map(([scope, styles]) => scopes[scope](styles.join(" ")))
      .join(" ")
      .replace(/__START__/g, context === "RTL" ? "right" : "left")
      .replace(/__END__/g, context === "RTL" ? "left" : "right");

  return prettier.format(stylesheet, { parser: "css" });
};

module.exports = hacss;

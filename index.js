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

const selector = ({ className, pseudos, context }) => {
  const self = [`.${CSS.escape(className)}`].concat(pseudos).join("");
  if (context) {
    const { operator } = context;
    return [
      selector({ ...context, className: context.className.split(":")[0] }),
      self
    ].join(operator === "_" ? " " : ` ${operator} `);
  }
  return self;
};

const hacss = ({ scopes, rules, context }, code) => {
  const scopePattern = `\\-\\-(${Object.keys(scopes).join("|")})`;

  const expressions = markup =>
    markup.match(
      new RegExp(
        `(?<=\\W)(${contextPattern})?(${
          Object
            .entries(rules)
            .map(([k, v]) => `${k}\\([^\\)]+\\)`)
            .map(pattern => `(${pattern}((${pseudoClassPattern}|${pseudoElementPattern})*))`)
            .reduce((pattern, subpattern) => pattern ? `${pattern}|${subpattern}` : subpattern, "")
        })(${scopePattern})?`,
        "g"
      )
    )
      .reduce((xs, x) => xs.includes(x) ? xs : xs.concat(x), []);

  const parse = className => {
    const f = className.match(new RegExp(`(${Object.keys(rules).join("|")})(\\W.*)?$`))[1];
    const args = className.match(/\(([^\)]+)\)/)[1].split(",");

    const context = (className.match(new RegExp(`^(${contextPattern})`, "g")) || []).map(c => ({
      className: c.substring(0, c.length - 1),
      operator: c.substring(c.length - 1),
    }))[0] || null;

    if (context) {
      context.pseudos = pseudos(context.className);
    }

    const scope =
      (className.match(new RegExp(`(${scopePattern})$`, "g")) || ["--default"])
        .map(x => x.substring(2))[0];

    return {
      className,
      pseudos: pseudos(className),
      context,
      scope,
      f,
      args
    };
  };

  const block = style => [style.scope, `${selector(style)} { ${rules[style.f].apply(null, style.args)} }`];

  const stylesheet = blocks =>
    Object
      .entries(
        blocks.reduce((groups, [g, block]) => ({
            ...groups,
            [g]: (groups[g] || []).concat(block),
          }), {})
      )
      .sort(([a], [b]) => a === "default" ? -1 : b === "default" ? 1 : 0)
      .map(([scope, styles]) => scopes[scope](styles.join(" ")))
      .join(" ")
      .replace(/__START__/g, context === "RTL" ? "right" : "left")
      .replace(/__END__/g, context === "RTL" ? "left" : "right");

  return prettier.format(
    stylesheet(expressions(code).map(parse).map(block)),
    { parser: "css" },
  );
};

module.exports = hacss;

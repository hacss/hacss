const fs = require("fs");
const prettier = require("prettier");

const config = require("./config.js");

const escape = className => className.replace(/[\:\(\),_>+]/g, x => `\\${x}`);

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

const scopePattern = scopes => `\\-\\-(${Object.keys(scopes).join("|")})`;

const expressions = ({ scopes, rules }) => markup =>
  markup.match(
    new RegExp(
      `(?<=\\W)(${contextPattern})?(${
        Object
          .entries(rules)
          .map(([k, v]) => `${k}${v.length > 0 ? "\\([^\\)]+\\)" : "(?![\\w\(\)])"}`)
          .map(pattern => `(${pattern}((${pseudoClassPattern}|${pseudoElementPattern})*))`)
          .reduce((pattern, subpattern) => pattern ? `${pattern}|${subpattern}` : subpattern, "")
      })(${scopePattern(scopes)})?`,
      "g"
    )
  )
    .reduce((xs, x) => xs.includes(x) ? xs : xs.concat(x), []);

const parse = ({ scopes, rules }) => className => {
  const f = className.match(new RegExp(`(${Object.keys(rules).join("|")})(\\W.*)?$`))[1];
  const args = rules[f].length ? className.match(/\(([^\)]+)\)/)[1].split(",") : [];

  const context = (className.match(new RegExp(`^(${contextPattern})`, "g")) || []).map(c => ({
    className: c.substring(0, c.length - 1),
    operator: c.substring(c.length - 1),
  }))[0] || null;

  if (context) {
    context.pseudos = pseudos(context.className);
  }

  const scope =
    (className.match(new RegExp(`(${scopePattern(scopes)})$`, "g")) || ["--default"]).map(x => x.substring(2))[0];

  return {
    className,
    pseudos: pseudos(className),
    context,
    scope,
    f,
    args
  };
};

const selector = ({ className, pseudos, context }) => {
  const self = [`.${escape(className)}`].concat(pseudos).join("");
  if (context) {
    const { operator } = context;
    return [
      selector({ ...context, className: context.className.split(":")[0] }),
      self
    ].join(operator === "_" ? " " : ` ${operator} `);
  }
  return self;
};

const block = rules => style =>
  [style.scope, `${selector(style)} { ${rules[style.f].apply(null, style.args)} }`];

const scope = scopes => blocks =>
  Object
    .entries(
      blocks.reduce((groups, [g, block]) => ({
          ...groups,
          [g]: (groups[g] || []).concat(block),
        }), {})
    )
    .sort(([a], [b]) => a === "default" ? -1 : b === "default" ? 1 : 0)
    .map(([scope, styles]) => scopes[scope](styles.join(" ")));

const main = () => {
  const styles =
    prettier.format(
      scope(config.scopes)(
        expressions(config)(fs.readFileSync("index.html", "utf8"))
          .map(parse(config))
          .map(block(config.rules))
      ).join(" "),
      { parser: "css" },
    );
  fs.writeFileSync("./styles.css", styles);
  console.log("done");
};

main();

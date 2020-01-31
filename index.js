require("css.escape");

const prettier = require("prettier");
const postcss = require("postcss");
const nested = require("postcss-nested");

const defaultConfig = require("./config/index.js");

const pseudoMap = {
  ":a": ":active",
  ":c": ":checked",
  ":d": ":default",
  ":di": ":disabled",
  ":e": ":empty",
  ":en": ":enabled",
  ":f": ":focus",
  ":fc": ":first-child",
  ":fi": ":first",
  ":fot": ":first-of-type",
  ":fs": ":fullscreen",
  ":fw": ":focus-within",
  ":h": ":hover",
  ":ind": ":indeterminate",
  ":inv": ":invalid",
  ":ir": ":in-range",
  ":l": ":left",
  ":lc": ":last-child",
  ":li": ":link",
  ":lot": ":last-of-type",
  ":o": ":optional",
  ":oc": ":only-child",
  ":oor": ":out-of-range",
  ":oot": ":only-of-type",
  ":r": ":right",
  ":req": ":required",
  ":ro": ":read-only",
  ":rt": ":root",
  ":rw": ":read-write",
  ":s": ":scope",
  ":t": ":target",
  ":va": ":valid",
  ":vi": ":visited",
  "::a": "::after",
  "::b": "::before",
  "::fl": "::first-letter",
  "::fli": "::first-line",
  "::ph": "::placeholder",
};

const extract = code =>
  Array.from(
    code.matchAll(
      /(?<context>\w+((\:{1,2}[a-z]+)+)?[_\+\>)])?(?<rule>[A-Z][A-Za-z]*)(\((?<args>[^\(\)]+)\))?(?<pseudos>(\:{1,2}[a-z]+)+)?(\-\-(?<scope>[A-Za-z]+))?(?=(['"\s\\])|$)/gm,
    ),
  )
    .reduce((ms, m) => (ms.some(n => n[0] === m[0]) ? ms : ms.concat([m])), [])
    .map(match => ({
      className: match[0],
      ...match.groups,
    }))
    .map(props => ({
      ...props,
      scope: props.scope || "default",
      context: props.context
        ? {
            className: props.context.match(/[\w]+/)[0],
            operator: props.context[props.context.length - 1],
            pseudos: props.context.match(/\:{1,2}[a-z]+/g),
          }
        : null,
      args: props.args ? props.args.split(",") : [],
      pseudos: props.pseudos ? props.pseudos.match(/(\:{1,2}[a-z]+)/g) : null,
    }));

const selector = (className, pseudos, ctx) => {
  const classSel = `.${CSS.escape(className)}${(pseudos || [])
    .map(p => pseudoMap[p])
    .join("")}`;
  return ctx
    ? [
        `.${CSS.escape(ctx.className)}`,
        (ctx.pseudos || []).map(p => pseudoMap[p]).join(""),
        ctx.operator === "_" ? " " : ` ${ctx.operator} `,
        classSel,
      ].join("")
    : classSel;
};

const hacss = (code, config = defaultConfig()) => {
  const { globalMapArg, globalMapOutput, scopes, rules } = config;

  const styles = extract(code)
    .map(spec => {
      const { rule, args } = spec;
      const ruleDef = rules[rule];
      switch (typeof ruleDef) {
        case "function":
          if (!args.length) {
            return spec;
          }
          return { ...spec, f: ruleDef };
        case "string":
          if (args.length) {
            return spec;
          }
          return { ...spec, f: () => ruleDef };
        case "object":
          const ruleDefSub = ruleDef[args.length];
          if (!ruleDefSub) {
            return spec;
          }
          switch (typeof ruleDefSub) {
            case "function":
              if (!args.length) {
                return spec;
              }
              return { ...spec, f: ruleDef };
            case "string":
              if (args.length) {
                return spec;
              }
              return { ...spec, f: () => ruleDefSub };
            default:
              return spec;
          }
        default:
          return spec;
      }
    })
    .filter(({ f }) => f)
    .map(({ scope, rule, f, args, context, pseudos, className }) => [
      scope,
      postcss([nested]).process(
        `
        ${selector(className, pseudos, context, scope)}
        {
          ${globalMapOutput(
            f.apply(
              null,
              (args || []).map((a, i) => globalMapArg(a, rule, i)),
            ),
            rule,
          )}
        }
      `.trim(),
      ).css,
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
    .join(" ");

  return prettier.format(stylesheet, { parser: "css" });
};

module.exports = hacss;

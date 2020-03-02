require("css.escape");

const prettier = require("prettier");
const postcss = require("postcss");
const nested = require("postcss-nested");
const {
  always,
  defaultTo,
  head,
  identity,
  ifElse,
  isNil,
  map,
  match,
  pick,
  pipe,
  uniqBy
} = require("ramda");

const { applyRecord, matchAll, renameKeys } = require("./src/function.js");

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

const comparePseudos = (a, b) => {
  if (a && b) {
    const [ap, bp] = [a, b].map(({ pseudos }) => pseudos);
    if (ap.length && !bp.length) {
      return 1;
    }
    if (!ap.length && bp.length) {
      return -1;
    }
    if (ap.length && bp.length) {
      const [aix, bix] = [ap, bp].map(
        x => Math.max.apply(
          null,
          x.map(p => [":li", ":vi", ":f", ":h", ":a", ":di"].indexOf(p))
        )
      );
      if (aix < bix) {
        return -1;
      }
      if (aix > bix) {
        return 1;
      }
    }
  }
  return 0;
};

const extract = pipe(
  matchAll(/(\w+(\:{1,2}[a-z]+)*[_\+\>])?([A-Z][A-Za-z]*)(\(((([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\)),)*(([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\))))\))?((\:{1,2}[a-z]+)+)?(\-\-([A-Za-z]+))?/m),
  uniqBy(head),
  map(
    pipe(
      pick([ 0, 1, 3, 5, 12, 15 ]),
      renameKeys({
        0: "className",
        1: "context",
        3: "rule",
        5: "args",
        12: "pseudos",
        15: "scope"
      }),
      applyRecord({
        className: identity,
        context: ifElse(
          isNil,
          always(null),
          pipe(
            match(/([^\:_\+\>]+)((\:{1,2}[a-z]+)+)?([_\+\>])/),
            pick([ 1, 2, 4 ]),
            renameKeys({ 1: "className", 2: "pseudos", 4: "operator" }),
            applyRecord({
              className: identity,
              pseudos: pipe(defaultTo(""), match(/\:{1,2}([a-z]+)/g)),
              operator: identity
            })
          )
        ),
        rule: identity,
        args: pipe(defaultTo(""), match(/([^,]+\([^\)]+\)|[^,]+)/g)),
        pseudos: pipe(defaultTo(""), match(/\:{1,2}([a-z]+)/g)),
        scope: defaultTo("default")
      })
    )
  )
);

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
              return { ...spec, f: ruleDefSub };
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
    .sort((a, b) => {
      const contextComp = comparePseudos(a.context, b.context);
      if (contextComp !== 0) {
        return contextComp;
      }
      return comparePseudos(a, b);
    })
    .map(({ scope, rule, f, args, context, pseudos, className }) => [
      scope,
      postcss([nested]).process(
        `
          ${selector(className, pseudos, context, scope)}
          {
            ${
              globalMapOutput(
                f.apply(
                  null,
                  (args || []).map((a, i) => globalMapArg(a, rule, i)),
                ),
                rule,
              )
                .replace(/__START__/g, "left")
                .replace(/__END__/g, "right")
            }
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

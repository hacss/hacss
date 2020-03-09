require("css.escape");

const {
  addIndex,
  adjust,
  always,
  append,
  apply,
  ascend,
  assoc,
  call,
  comparator,
  concat,
  curry,
  defaultTo,
  equals,
  filter,
  flatten,
  flip,
  fromPairs,
  groupBy,
  has,
  head,
  identity,
  ifElse,
  indexOf,
  insert,
  isNil,
  join,
  map,
  mapObjIndexed,
  match,
  max,
  not,
  o,
  of,
  path,
  pick,
  pipe,
  prepend,
  prop,
  reduce,
  repeat,
  replace,
  reverse,
  sort,
  sortBy,
  sortWith,
  take,
  toPairs,
  unapply,
  uncurryN,
  uniqBy,
  values,
  when,
  xprod,
} = require("ramda");
const { format } = require("prettier/standalone");
const prettierCSS = require("prettier/parser-postcss");
const postcss = require("postcss");
const nested = require("postcss-nested");

const applyRecord = f =>
  mapObjIndexed(
    pipe(
      unapply(identity),
      take(2),
      reverse,
      adjust(0, flip(prop)(f)),
      apply(call),
    ),
  );

const computeField = (key, fn) =>
  pipe(flip(repeat)(2), adjust(0, fn), insert(0, key), apply(assoc));

const renameKeys = k => pipe(toPairs, map(adjust(0, flip(prop)(k))), fromPairs);

const matchAll = pattern => str => {
  const matches = [];
  for (
    let s = str, match = s.match(pattern);
    s && match;
    s = s.substring(match.index + match[0].length), match = s.match(pattern)
  ) {
    matches.push(match);
  }
  return matches;
};

const declarations = ruleFn =>
  pipe(
    flip(repeat)(2),
    adjust(0, prop("rule")),
    adjust(1, prop("args")),
    apply(ruleFn),
  );

const pseudoCSS = flip(prop)({
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
});

const pseudoWeight = pipe(
  map(flip(indexOf)([":li", ":vi", ":f", ":h", ":a", ":di"])),
  reduce(max, -1),
);

const selector = pipe(
  pick(["className", "pseudos", "context", "operator"]),
  applyRecord({
    className: pipe(CSS.escape, prepend("."), join("")),
    pseudos: map(pseudoCSS),
    context: when(o(not, isNil), x => selector(x)),
    operator: ifElse(
      equals("_"),
      always(" "),
      pipe(append(" "), prepend(" "), join("")),
    ),
  }),
  computeField(
    "selector",
    pipe(
      pick(["className", "pseudos"]),
      values,
      insert(0, concat),
      apply(reduce),
    ),
  ),
  when(
    has("operator"),
    computeField(
      "selector",
      pipe(pick(["selector", "operator"]), values, join("")),
    ),
  ),
  pick(["selector", "context"]),
  applyRecord({
    context: prop("selector"),
    selector: identity,
  }),
  when(
    has("context"),
    pipe(pick(["context", "selector"]), values, join("")),
  ),
);

const build = ({ rules, scopes, globalMapArg, globalMapOutput }) => {
  const args = pipe(
    pick(["rule", "args"]),
    values,
    adjust(0, of),
    apply(xprod),
    map(reverse),
    addIndex(map)(pipe(unapply(identity), take(2), flatten)),
    map(apply(globalMapArg)),
  );

  const rule = (name, args) => {
    const rule = rules[name];
    if (!rule) {
      return null;
    }
    switch (typeof rule) {
      case "string":
        if (args.length) {
          return null;
        }
        return rule;
      case "function":
        const decls = rule.apply(null, args);
        if (~decls.indexOf("undefined")) {
          return null;
        }
        return decls;
      case "object":
        const sub = rule[args.length];
        if (!sub) {
          return null;
        }
        switch (typeof sub) {
          case "string":
            return sub;
          case "function":
            return sub.apply(null, args);
          default:
            return null;
        }
    }
  };

  return pipe(
    matchAll(
      /(\w+(\:{1,2}[a-z]+)*[_\+\>])?([A-Z][A-Za-z]*)(\(((([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\)),)*(([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\))))\))?((\:{1,2}[a-z]+)+)?(\-\-([A-Za-z]+))?/m,
    ),
    uniqBy(head),
    map(
      pipe(
        pick([0, 1, 3, 5, 12, 15]),
        renameKeys({
          0: "className",
          1: "context",
          3: "rule",
          5: "args",
          12: "pseudos",
          15: "scope",
        }),
        applyRecord({
          className: identity,
          context: when(
            o(not, isNil),
            pipe(
              match(/([^\:_\+\>]+)((\:{1,2}[a-z]+)+)?([_\+\>])/),
              pick([1, 2, 4]),
              renameKeys({ 1: "className", 2: "pseudos", 4: "operator" }),
              applyRecord({
                className: identity,
                pseudos: pipe(defaultTo(""), match(/\:{1,2}([a-z]+)/g)),
                operator: identity,
              }),
            ),
          ),
          rule: identity,
          args: pipe(defaultTo(""), match(/([^,]+\([^\)]+\)|[^,]+)/g)),
          pseudos: pipe(defaultTo(""), match(/\:{1,2}([a-z]+)/g)),
          scope: defaultTo("default"),
        }),
        computeField("args", args),
        computeField("selector", selector),
        computeField(
          "declarations",
          declarations(
            pipe(
              unapply(identity),
              flip(repeat)(2),
              adjust(0, apply(rule)),
              adjust(1, head),
              apply(globalMapOutput),
              when(
                o(not, isNil),
                pipe(
                  replace(/__START__/g, "left"),
                  replace(/__END__/g, "right"),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
    filter(pipe(prop("declarations"), isNil, not)),
    sortWith([
      ascend(pipe(path(["context", "pseudos"]), defaultTo([]), pseudoWeight)),
      ascend(pipe(prop("pseudos"), pseudoWeight)),
    ]),
    groupBy(prop("scope")),
    map(
      pipe(
        map(
          pipe(
            pick(["selector", "declarations"]),
            values,
            insert(1, "{"),
            append("}"),
            join(" "),
          ),
        ),
        join("\n"),
      ),
    ),
    toPairs,
    sortBy(pipe(head, equals("default"), not)),
    map(
      pipe(
        adjust(0, pipe(flip(prop)(scopes), defaultTo(identity))),
        apply(call),
      ),
    ),
    join("\n"),
  );
};

module.exports = pipe(
  flip(uncurryN(2, build)),
  css => postcss([nested]).process(css).css,
  flip(curry(format))({ parser: "css", plugins: [prettierCSS] }),
);

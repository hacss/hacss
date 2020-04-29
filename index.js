require("css.escape");

const {
  T,
  addIndex,
  adjust,
  always,
  any,
  apply,
  applyTo,
  ascend,
  assoc,
  call,
  concat,
  cond,
  contains,
  curryN,
  defaultTo,
  descend,
  dissoc,
  drop,
  equals,
  filter,
  flip,
  fromPairs,
  head,
  identity,
  ifElse,
  indexOf,
  insert,
  isEmpty,
  isNil,
  join,
  length,
  map,
  mapObjIndexed,
  match,
  max,
  mergeRight,
  not,
  nth,
  nthArg,
  o,
  pick,
  pipe,
  prepend,
  prop,
  reduce,
  repeat,
  replace,
  reverse,
  sortWith,
  split,
  take,
  toPairs,
  type,
  unapply,
  uniqBy,
  values,
  when,
  zip,
} = require("ramda");
const knownProperties = require("known-css-properties").all;

const DEFAULT_MEDIA_QUERIES = {
  "small": "only screen and (max-width: 599px)",
  "medium": "only screen and (min-width: 600px) and (max-width: 999px)",
  "large": "only screen and (min-width: 1000px)",
};

const applyRecord = f =>
  mapObjIndexed(
    pipe(
      unapply(identity),
      take(2),
      reverse,
      adjust(0, pipe(flip(prop)(f), defaultTo(identity))),
      apply(call),
    ),
  );

const computeField = (key, fn) =>
  pipe(flip(repeat)(2), adjust(0, fn), insert(0, key), apply(assoc));

const matchAll = pattern => str => {
  if (!pattern || !str) {
    return [];
  }
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

const balanced = pipe(
  flip(repeat)(2),
  adjust(0, pipe(match(/\{/g), length)),
  adjust(1, pipe(match(/\}/g), length)),
  apply(equals),
);

const pseudoWeight = pipe(
  map(flip(indexOf)([
    ":link",
    ":visited",
    ":focus",
    ":hover",
    ":active",
    ":disabled",
  ])),
  reduce(max, -1),
);

const selector = pipe(
  flip(repeat)(2),
  adjust(
    0,
    pipe(
      pick(["context", "operator"]),
      values,
      ifElse(
        any(isNil),
        always(""),
        pipe(
          adjust(0, concat(".")),
          adjust(1, ifElse(equals("_"), always(""), flip(concat)(" "))),
          join(" "),
        ),
      ),
    ),
  ),
  adjust(
    1,
    pipe(
      pick(["className", "pseudos"]),
      values,
      adjust(0, pipe(CSS.escape, concat("."))),
      join(""),
    ),
  ),
  join(""),
);

const parseDeclarations = pipe(
  split(";"),
  filter(o(not, isEmpty)),
  map(pipe(match(/([^\:]+)\:(.+)/), drop(1))),
  fromPairs,
);

const applyFixes = map(
  pipe(
    replace(
      /calc\(.+\)/g,
      replace(
        /[\+\-\*\/]/g,
        o(concat(" "), flip(concat)(" ")),
      ),
    ),
    replace(/__/g, " "),
  ),
);

const stringifyDeclarations = pipe(
  toPairs,
  map(o(flip(concat)(";"), join(":"))),
  join(""),
);

const wrapper = curryN(
  2,
  ifElse(
    pipe(nthArg(0), isNil),
    nthArg(1),
    pipe(
      unapply(identity),
      adjust(1, pipe(concat("{"), flip(concat)("}"))),
      join(""),
    ),
  ),
);

const build = config => {
  const mediaQueries = mergeRight(
    DEFAULT_MEDIA_QUERIES,
    config.mediaQueries || [],
  );

  const applyPlugins = pipe(
    map(
      cond([
        [ pipe(type, equals("Array")), nth(0) ],
        [ pipe(type, equals("Function")), identity ],
        [ T, always(identity) ],
      ])
    ),
    reduce(o, identity),
  )(config.plugins || []);

  const properties = reduce(
    concat,
    knownProperties,
    map(o(defaultTo([]), nth(1)), (config.plugins || [])),
  );

  const pattern = new RegExp(`(@(\\w+){)?((\\w+(:[^\\s]+)?)([_+>]))?((:[^\\s{]+){)?(((${
    join("|", properties)
  }):[^\\s;]+;)+)[}]*`);

  return pipe(
    matchAll(pattern),
    filter(o(balanced, head)),
    uniqBy(head),
    map(
      pipe(
        addIndex(filter)(pipe(nthArg(1), flip(contains)([0, 2, 4, 6, 8, 9]))),
        zip([
          "className",
          "mediaQuery",
          "context",
          "operator",
          "pseudos",
          "declarations",
        ]),
        fromPairs,
        computeField("selector", selector),
        applyRecord({
          mediaQuery: when(
            o(not, isNil),
            pipe(
              flip(prop)(mediaQueries),
              defaultTo("not all"),
              concat("@media "),
            ),
          ),
          declarations: pipe(
            parseDeclarations,
            applyFixes,
            applyPlugins,
            stringifyDeclarations,
          ),
        }),
      ),
    ),
    sortWith([
      descend(pipe(prop("mediaQuery"), isNil)),
      ascend(pipe(prop("context"), defaultTo(""), match(/:[^:]+/g), pseudoWeight)),
      ascend(pipe(prop("pseudos"), defaultTo(""), match(/:[^:]+/g), pseudoWeight)),
    ]),
    map(
      pipe(
        apply(pipe, map(dissoc, ["className", "pseudos", "context", "operator"])),
        flip(repeat)(2),
        adjust(0, prop("declarations")),
        adjust(
          1,
          pipe(
            dissoc("declarations"),
            values,
            reverse,
            map(wrapper),
          ),
        ),
        prepend(applyTo),
        apply(reduce),
      ),
    ),
    join("\n"),
  );
};

module.exports = (code, config) => build(config)(code);

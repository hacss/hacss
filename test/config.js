const {
  adjust,
  apply,
  concat,
  curryN,
  drop,
  filter,
  flip,
  head,
  identity,
  insert,
  join,
  keys,
  map,
  mapObjIndexed,
  o,
  pipe,
  prop,
  repeat,
  replace,
  reverse,
  take,
  unapply,
} = require("ramda");

const globalVariables = variables => map(
  replace(
    /\$([\w\-]+)/g,
    pipe(
      flip(repeat)(2),
      adjust(0, pipe(drop(1), flip(prop)(variables))),
      filter(identity),
      head,
    ),
  ),
);

const scopedVariables = variables => mapObjIndexed(
  pipe(
    unapply(identity),
    take(2),
    reverse,
    adjust(
      0,
      pipe(
        flip(prop)(variables),
        flip(prop),
        adjust(0),
        curryN(2, o)(pipe(filter(identity), head)),
        curryN(3, pipe)(flip(repeat)(2), adjust(0, drop(1))),
      ),
    ),
    insert(0, /\$([\w\-]+)/g),
    apply(replace),
  ),
);

const calcFix = map(
  replace(
    /calc\(.+\)/g,
    replace(
      /[\+\-\*\/]/g,
      o(concat(" "), flip(concat)(" ")),
    ),
  ),
);

module.exports = {
  mediaQueries: {
    "small": "only screen and (max-width: 599px)",
    "medium": "only screen and (min-width: 600px) and (max-width: 1000px)",
    "large": "only screen and (min-width: 1000px)",
  },
  plugins: [
    globalVariables({
    }),
    scopedVariables({
      "font-size": {
        medium: "16px",
        "medium-plus": "20px",
        large: "28px",
        "extra-large": "40px",
      },
      "font-family": {
        "sans-serif": "'Roboto', sans-serif",
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
    map(replace(/__/g, " ")),
    calcFix,
  ],
};

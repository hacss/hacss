const {
  adjust,
  drop,
  filter,
  flip,
  head,
  identity,
  map,
  pipe,
  prop,
  repeat,
  replace,
} = require("ramda");

module.exports = variables => map(
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

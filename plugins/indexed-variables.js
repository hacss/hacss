const {
  adjust,
  apply,
  curryN,
  drop,
  filter,
  flip,
  head,
  identity,
  insert,
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

module.exports = variables => mapObjIndexed(
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

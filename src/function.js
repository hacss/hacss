const {
  adjust,
  apply,
  call,
  flip,
  fromPairs,
  identity,
  map,
  mapObjIndexed,
  pipe,
  prop,
  reverse,
  take,
  toPairs,
  unapply
} = require("ramda");

exports.applyRecord = f =>
  mapObjIndexed(
    pipe(
      unapply(identity),
      take(2),
      reverse,
      adjust(0, flip(prop)(f)),
      apply(call)
    )
  );

exports.renameKeys = k => pipe(toPairs, map(adjust(0, flip(prop)(k))), fromPairs);

exports.matchAll = pattern => str => {
  const matches = [];
  matches.push(str.match(pattern));
  for (
    let s = str, match = s.match(pattern);
    s && match;
    s = s.substring(match.index + match[0].length), match = s.match(pattern)
  ) {
    matches.push(match);
  }
  return matches;
};

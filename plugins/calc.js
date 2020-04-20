const {
  concat,
  flip,
  map,
  o,
  replace,
} = require("ramda");

module.exports = map(
  replace(
    /calc\(.+\)/g,
    replace(
      /[\+\-\*\/]/g,
      o(concat(" "), flip(concat)(" ")),
    ),
  ),
);

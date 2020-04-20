const {
  concat,
  flip,
  ifElse,
  map,
  nthArg,
  pipe,
  replace,
  test,
} = require("ramda");

module.exports = map(
  replace(
    /url\((.+?)\)/g,
    ifElse(
      pipe(nthArg(1), test(/".+"/)),
      nthArg(0),
      pipe(nthArg(1), concat("url(\""), flip(concat)("\")")),
    ),
  ),
);

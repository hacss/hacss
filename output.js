const { fromNullable } = require("fp-ts/lib/Option");
const { flow } = require("fp-ts/lib/function");
const { pipe } = require("fp-ts/lib/pipeable");
const { map, mapLeft } = require("fp-ts/lib/TaskEither");
const { build } = require("./dist/build.js");

module.exports = ({ config, sources }) => new Promise((resolve, reject) => pipe(
  build({ sources, config: fromNullable(config) }),
  map(flow(code => ({ code }), resolve)),
  mapLeft(reject)
));

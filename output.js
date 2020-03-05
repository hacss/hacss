const build = require("./build.js");

module.exports =
  ({ sources, config }) => build(sources, config).then(code => ({ code }));

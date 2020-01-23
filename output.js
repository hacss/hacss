const fs = require("fs");
const glob = require("glob");
const path = require("path");
const { promisify } = require("util");
const hacss = require("./index.js");
const config = require("./config/index.js");

const globP = promisify(glob);
const readFileP = promisify(fs.readFile);

module.exports = options => {
  options.config =
    options.config || path.join(process.cwd(), "hacss.config.js");
  return globP(options.sources)
    .then(sources => Promise.all(sources.map(s => readFileP(s, "utf8"))))
    .then(sources => sources.join("\n"))
    .then(code => ({ code: hacss(config(options.config), code) }));
};

const { existsSync, readFile } = require("fs");
const glob = require("glob");
const path = require("path");
const { promisify } = require("util");
const { flatten, nthArg, pipe, uniq } = require("ramda");

const readFileP = promisify(readFile);
const globP = promisify(glob);

const hacss = require("./index.js");
const { customConfig, defaultConfig } = require("./config/index.js");

const loadConfig = c => {
  const load = x => customConfig(require(path.join(process.cwd(), x)));

  if (c) {
    return load(c);
  }
  if (existsSync("hacss.config.js")) {
    return load("hacss.config.js");
  }
  return defaultConfig;
};

const loadSources = s =>
  (s.map
    ? Promise.all(s.map(pipe(nthArg(0), globP))).then(pipe(flatten, uniq))
    : globP(s)
  )
    .then(sources => Promise.all(sources.map(s => readFileP(s, "utf8"))))
    .then(code => code.join("\n"));

module.exports = (s, c) => {
  const config = loadConfig(c);
  return loadSources(s).then(sources => hacss(sources, config));
};

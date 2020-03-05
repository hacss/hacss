const fs = require("fs");
const glob = require("glob");
const path = require("path");
const { promisify } = require("util");
const hacss = require("./index.js");
const { customConfig, defaultConfig } = require("./config/index.js");

const [globP, accessP, readFileP] = [
  glob,
  fs.access,
  fs.readFile,
].map(promisify);

const config = async source => {
  if (source) {
    return customConfig(require(source));
  }
  const defaultSource = path.join(process.cwd(), "hacss.config.js");
  try {
    await accessP(defaultSource);
    return customConfig(require(defaultSource));
  }
  catch {
    return defaultConfig;
  }
};

module.exports = options => {
  return Promise.all([
    globP(options.sources)
      .then(sources => Promise.all(sources.map(s => readFileP(s, "utf8"))))
      .then(sources => sources.join("\n")),
    config(options.config),
  ])
    .then(x => hacss.apply(null, x));
};

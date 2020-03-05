#!/usr/bin/env node

const fs = require("fs");
const glob = require("glob");
const mkdirp = require("mkdirp");
const path = require("path");
const util = require("util");

const { name } = require("./package.json");
const hacss = require("./index.js");
const { customConfig, defaultConfig } = require("./config/index.js");

const [globP, mkdirpP, accessP, readFileP, writeFileP] = [
  glob,
  mkdirp,
  fs.access,
  fs.readFile,
  fs.writeFile,
].map(util.promisify);

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

const a = process.argv.slice(2);

const validArgs =
  [1, 3, 5].includes(a.length) &&
  !a[a.length - 1].startsWith("--") &&
  a.every(a => !a.startsWith("--") || ["--config", "--output"].includes(a));

if (!validArgs) {
  console.log(
    `Usage: ${name} [--config <config-file>] [--output <output-file>] <sources>`,
  );
} else {
  const options = {
    output: null,
    sources: a[a.length - 1],
  };

  const configIx = a.indexOf("--config");

  if (configIx !== -1) {
    options.config = path.join(process.cwd(), a[configIx + 1]);
  }

  const outputIx = a.indexOf("--output");

  if (outputIx !== -1) {
    options.output = path.join(process.cwd(), a[outputIx + 1]);
  }

  Promise.all([
    globP(options.sources)
      .then(sources => Promise.all(sources.map(s => readFileP(s, "utf8"))))
      .then(sources => sources.join("\n")),
    config(options.config),
  ])
    .then(x => hacss.apply(null, x))
    .then(css =>
      options.output
        ? mkdirpP(path.dirname(options.output)).then(() =>
            writeFileP(options.output, css),
          )
        : process.stdout.write(css),
    )
    .catch(err => console.error(err));
}

#!/usr/bin/env node

const {
  adjust,
  drop,
  dropWhile,
  equals,
  fromPairs,
  ifElse,
  insert,
  length,
  map,
  pipe,
  splitEvery,
} = require("ramda");

const { writeFile } = require("fs");
const { dirname } = require("path");
const { promisify } = require("util");
const mkdirp = require("mkdirp");

const writeFileP = promisify(writeFile);
const mkdirpP = promisify(mkdirp);

const build = require("./build.js");

if (process.argv.length < 3) {
  return console.log(`
    Usage: hacss [--config <config-file>] [--output <output-file>] <sources>
  `.trim());
}

const { sources, config, output } = pipe(
  drop(2),
  splitEvery(2),
  map(
    ifElse(
      pipe(length, equals(2)),
      adjust(0, dropWhile(equals("-"))),
      insert(0, "sources")
    )
  ),
  fromPairs
)(process.argv);

build(sources, config)
  .then(css => output
    ? mkdirpP(dirname(output)).then(() =>
        writeFileP(output, css),
      )
    : process.stdout.write(css),
  )
  .catch(err => console.error(err));

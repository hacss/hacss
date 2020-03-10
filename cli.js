#!/usr/bin/env node

const {
  adjust,
  apply,
  concat,
  drop,
  dropWhile,
  equals,
  flatten,
  flip,
  fromPairs,
  head,
  ifElse,
  insert,
  length,
  map,
  of,
  pipe,
  repeat,
  splitEvery,
  startsWith,
  takeWhile,
} = require("ramda");

const { writeFile } = require("fs");
const { dirname } = require("path");
const { promisify } = require("util");
const mkdirp = require("mkdirp");

const writeFileP = promisify(writeFile);
const mkdirpP = promisify(mkdirp);

const build = require("./build.js");

if (process.argv.length < 3) {
  return console.log(
    `
    Usage: hacss [--config <config-file>] [--output <output-file>] <sources>
  `.trim(),
  );
}

const { sources, config, output } = pipe(
  drop(2),
  splitEvery(2),
  flip(repeat)(2),
  adjust(0, pipe(takeWhile(pipe(head, startsWith("--"))), map(adjust(0, drop(2))))),
  adjust(1, pipe(dropWhile(pipe(head, startsWith("--"))), flatten, of, insert(0, "sources"), of)),
  apply(concat),
  fromPairs,
)(process.argv);

build(sources, config)
  .then(css =>
    output
      ? mkdirpP(dirname(output)).then(() => writeFileP(output, css))
      : process.stdout.write(css),
  )
  .catch(err => console.error(err));

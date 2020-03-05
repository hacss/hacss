#!/usr/bin/env node

const assert = require("assert");
const path = require("path");
const { readFile } = require("fs");
const { promisify } = require("util");
const readFileP = promisify(readFile);

const output = require("../output.js");

const main = async () => {
  process.chdir(__dirname);

  const result = await output({ sources: "index.html", config: "config.js" });

  if (!result.code) {
    assert.fail(`The output should be an object with a "code" property.`);
  }

  assert.equal(result.code, await readFileP(path.join(__dirname, "styles.css")));
};

main()
  .then(() => console.log("Output test succeeded."))
  .catch(e => console.error(e));

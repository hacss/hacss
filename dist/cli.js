#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Array_1 = require("fp-ts/lib/Array");
const Apply_1 = require("fp-ts/lib/Apply");
const Console_1 = require("fp-ts/lib/Console");
const Either_1 = require("fp-ts/lib/Either");
const E = require("fp-ts/lib/Either");
const Eq_1 = require("fp-ts/lib/Eq");
const IO_1 = require("fp-ts/lib/IO");
const IOE = require("fp-ts/lib/IOEither");
const O = require("fp-ts/lib/Option");
const TaskEither_1 = require("fp-ts/lib/TaskEither");
const TE = require("fp-ts/lib/TaskEither");
const function_1 = require("fp-ts/lib/function");
const pipeable_1 = require("fp-ts/lib/pipeable");
const fs_1 = require("fs");
const glob = require("glob");
const path = require("path");
const Config_1 = require("./Config");
const hacss_1 = require("./hacss");
const localPath = (p) => pipeable_1.pipe(IOE.tryCatch(() => process.cwd(), Either_1.toError), IOE.map(d => path.join(d, p)));
const lookupArg = (names) => pipeable_1.pipe(() => process.argv, IO_1.map(args => pipeable_1.pipe(args, Array_1.findIndex((a) => Array_1.elem(Eq_1.eqString)(a, names)), O.chain(i => Array_1.lookup(i + 1, args)))));
const loadConfig = function_1.flow(localPath, IOE.chain(p => IOE.tryCatch(() => require(p), Either_1.toError)), IOE.chain(function_1.flow(Config_1.customConfig, E.mapLeft(Either_1.toError), IOE.fromEither)));
const config = IOE.alt(() => IOE.right(Config_1.defaultConfig))(IOE.alt(() => loadConfig("hacss.config.js"))(pipeable_1.pipe(lookupArg(["-c", "--config"]), IO_1.map(E.fromOption(() => new Error("Config not specified."))), IOE.chain(loadConfig))));
const logUsage = Console_1.log(`
  Usage: hacss [--config <config-file>] [--output <output-file>] <sources>
`.trim());
const globT = TE.taskify(glob);
const readFileUTF8T = function_1.flow(TE.taskify(fs_1.readFile), TE.map((b) => b.toString()), TE.mapLeft(Either_1.toError));
const sources = pipeable_1.pipe(() => process.argv, IO_1.map(function_1.flow(Array_1.last, E.fromOption(() => new Error("Sources not specified.")))), TE.fromIOEither, TE.chain(globT), TE.chain(function_1.flow(Array_1.map(readFileUTF8T), Array_1.array.sequence(TE.taskEither))), TE.map(Array_1.reduce("", (a, b) => a + "\n" + b)));
const createWriteStreamSafe = (f) => IOE.tryCatch(() => fs_1.createWriteStream(f), Either_1.toError);
const outputStream = IOE.alt(() => IOE.right(process.stdout))(pipeable_1.pipe(lookupArg(["-o", "--output"]), IO_1.map(E.fromOption(() => new Error("Output not specified."))), IOE.chain(createWriteStreamSafe)));
pipeable_1.pipe(Apply_1.sequenceT(TaskEither_1.taskEither)(sources, TE.fromIOEither(config), TE.fromIOEither(outputStream)), TE.map(([sources, config, output]) => output.write(hacss_1.default(sources, config))), TE.mapLeft(console.error))();

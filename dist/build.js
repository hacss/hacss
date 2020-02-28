"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Array_1 = require("fp-ts/lib/Array");
const Apply_1 = require("fp-ts/lib/Apply");
const Either_1 = require("fp-ts/lib/Either");
const E = require("fp-ts/lib/Either");
const IOE = require("fp-ts/lib/IOEither");
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
const loadConfig = function_1.flow(localPath, IOE.chain(p => IOE.tryCatch(() => require(p), Either_1.toError)), IOE.chain(function_1.flow(Config_1.customConfig, E.mapLeft(Either_1.toError), IOE.fromEither)));
const globT = TE.taskify(glob);
const readFileUTF8T = function_1.flow(TE.taskify(fs_1.readFile), TE.map((b) => b.toString()), TE.mapLeft(Either_1.toError));
const createWriteStreamSafe = (f) => IOE.tryCatch(() => fs_1.createWriteStream(f), Either_1.toError);
exports.build = (args) => {
    // Todo: Fallbacks hide certain errors.
    const config = pipeable_1.pipe(args.config, IOE.fromOption(() => new Error("Config not specified.")), IOE.chain(loadConfig), IOE.alt(() => loadConfig("hacss.config.js")), IOE.alt(() => IOE.right(Config_1.defaultConfig)));
    const sources = pipeable_1.pipe(globT(args.sources), TE.chain(function_1.flow(Array_1.map(readFileUTF8T), Array_1.array.sequence(TE.taskEither))), TE.map(Array_1.reduce("", (a, b) => a + "\n" + b)));
    // Todo: Fallbacks hide certain errors.
    const outputStream = pipeable_1.pipe(args.output, IOE.fromOption(() => new Error("Output not specified.")), IOE.chain(createWriteStreamSafe), IOE.alt(() => IOE.right(process.stdout)));
    return pipeable_1.pipe(Apply_1.sequenceT(TaskEither_1.taskEither)(sources, TE.fromIOEither(config), TE.fromIOEither(outputStream)), TE.map(([sources, config, output]) => { output.write(hacss_1.default(sources, config)); }));
};

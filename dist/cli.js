"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Apply_1 = require("fp-ts/lib/Apply");
const Array_1 = require("fp-ts/lib/Array");
const E = require("fp-ts/lib/Either");
const IO_1 = require("fp-ts/lib/IO");
const Option_1 = require("fp-ts/lib/Option");
const O = require("fp-ts/lib/Option");
const R = require("fp-ts/lib/Record");
const TE = require("fp-ts/lib/TaskEither");
const function_1 = require("fp-ts/lib/function");
const pipeable_1 = require("fp-ts/lib/pipeable");
const build_1 = require("./build");
const mapArgName = (n) => {
    switch (n) {
        case "--config":
        case "-c":
            return Option_1.some("config");
        case "--output":
        case "-o":
            return Option_1.some("output");
        default:
            return Option_1.none;
    }
};
const parseArgs = function_1.flow(Array_1.dropLeft(2), Array_1.chunksOf(2), Array_1.filterMap(Array_1.foldLeft(() => Option_1.none, (h, t) => t.length === 0
    ? Apply_1.sequenceT(Option_1.option)(Option_1.some("sources"), pipeable_1.pipe(Option_1.some(h), O.filter(x => x[0] !== "-")))
    : Apply_1.sequenceT(Option_1.option)(mapArgName(h), Array_1.head(t)))), R.fromFoldable({ concat: (a, b) => a }, Array_1.array), r => {
    const optionalFields = R.map((x) => R.lookup(x, r))({
        config: "config",
        output: "output"
    });
    return pipeable_1.pipe(R.lookup("sources", r), O.map(sources => ({ ...optionalFields, sources })), E.fromOption(() => new Error("Sources not specified.")));
});
const main = pipeable_1.pipe(() => process.argv, IO_1.map(parseArgs), TE.fromIOEither, TE.chain(build_1.build), TE.mapLeft(error => console.error(error)));
main();

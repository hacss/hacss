import { sequenceT } from "fp-ts/lib/Apply";
import { array, chunksOf, dropLeft, filterMap, foldLeft, head } from "fp-ts/lib/Array";
import * as E from "fp-ts/lib/Either";
import { Either } from "fp-ts/lib/Either";
import { map as mapIO } from "fp-ts/lib/IO";
import { rightIO } from "fp-ts/lib/IOEither";
import * as IOE from "fp-ts/lib/IOEither";
import { Option, none, option, some } from "fp-ts/lib/Option";
import * as O from "fp-ts/lib/Option";
import * as R from "fp-ts/lib/Record";
import * as TE from "fp-ts/lib/TaskEither";
import { flow } from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";
import { Args, build } from "./build";

const mapArgName = (n: string): Option<string> => {
  switch (n) {
    case "--config":
    case "-c":
      return some("config");
    case "--output":
    case "-o":
      return some("output");
    default:
      return none;
  }
};

const parseArgs: (a: string[]) => Either<Error, Args> = flow(
  dropLeft(2),
  chunksOf(2),
  filterMap(
    foldLeft(
      () => none,
      (h: string, t: string[]) => t.length === 0
        ? sequenceT(option)(some("sources"), pipe(some(h), O.filter(x => x[0] !== "-")))
        : sequenceT(option)(mapArgName(h), head(t))
    )
  ),
  R.fromFoldable<any, string>({ concat: (a, b) => a }, array),
  r => {
    const optionalFields = R.map((x: string) => R.lookup(x, r))({
      config: "config",
      output: "output"
    });

    return pipe(
      R.lookup("sources", r),
      O.map(sources => ({ ...optionalFields, sources })),
      E.fromOption(() => new Error("Sources not specified."))
    );
  }
);

const main = () => {
  const { argv } = process;

  if (argv.length < 3) {
    return console.log(`
    Usage: hacss [--config <config-file>] [--output <output-file>] <sources>
    `.trim());
  }

  return pipe(
    argv,
    parseArgs,
    TE.fromEither,
    TE.chain(build),
    TE.mapLeft(error => console.error(error))
  );
};

main();

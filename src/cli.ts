import { array, elem, findIndex, last, lookup, map, reduce } from "fp-ts/lib/Array";
import { sequenceT } from "fp-ts/lib/Apply";
import { log } from "fp-ts/lib/Console";
import { toError } from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Either";
import { eqString } from "fp-ts/lib/Eq";
import { IO, map as mapIO } from "fp-ts/lib/IO";
import { IOEither } from "fp-ts/lib/IOEither";
import * as IOE from "fp-ts/lib/IOEither";
import * as O from "fp-ts/lib/Option";
import { TaskEither, taskEither } from "fp-ts/lib/TaskEither";
import * as TE from "fp-ts/lib/TaskEither";
import { flow } from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";
import { readFile, writeFile } from "fs";
import * as glob from "glob";
import * as path from "path";
import { promisify } from "util";
import { ConfigSpec, customConfig, defaultConfig } from "./Config";
import hacss from "./hacss";

const localPath = (p: string): IOEither<Error, string> => pipe(
  IOE.tryCatch(() => process.cwd(), toError),
  IOE.map(d => path.join(d, p))
);

const lookupArg = (names: string[]): IOEither<Error, string> => pipe(
  () => process.argv,
  mapIO(
    args =>
      pipe(
        args,
        findIndex((a: string) => elem(eqString)(a, names)),
        O.chain(i => lookup(i + 1, args)),
        E.fromOption(
          () => new Error(`Argument not specified: ${names.join(", ")}`)
        )
      )
  )
);

const loadConfig: ((file: string) => IOEither<Error, ConfigSpec>) = flow(
  localPath,
  IOE.chain(p => IOE.tryCatch(() => require(p), toError)),
  IOE.chain(flow(customConfig, E.mapLeft(toError), IOE.fromEither))
);

const config: IOEither<Error, ConfigSpec> =
  IOE.alt(() => IOE.right<Error, ConfigSpec>(defaultConfig))(
    IOE.alt(() => loadConfig("hacss.config.js"))(pipe(
      lookupArg(["-c", "--config"]),
      IOE.chain(loadConfig)
    ))
  );

const logUsage: IO<void> = log(`
  Usage: hacss [--config <config-file>] [--output <output-file>] <sources>
`.trim());

const globT: ((pattern: string) => TaskEither<Error, string[]>) =
  TE.taskify(glob);

const readFileUTF8T: (path: string) => TaskEither<Error, string> = flow(
  TE.taskify(readFile),
  TE.map((b: Buffer) => b.toString()),
  TE.mapLeft(toError)
);

const sources: TaskEither<Error, string> = pipe(
  () => process.argv,
  mapIO(flow(
    last,
    E.fromOption(() => new Error("Sources not specified."))
  )),
  TE.fromIOEither,
  TE.chain(globT),
  TE.chain(flow(map(readFileUTF8T), array.sequence(TE.taskEither))),
  TE.map(reduce("", (a, b) => a + "\n" + b))
);

pipe(
  sequenceT(taskEither)(sources, TE.fromIOEither(config)),
  TE.map(([ sources, config ]) => console.log(hacss(sources, config))),
  TE.mapLeft(console.error)
)();

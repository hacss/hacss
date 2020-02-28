import {
  array,
  dropLeft,
  elem,
  findIndex,
  last,
  lookup,
  map,
  reduce
} from "fp-ts/lib/Array";
import { sequenceT } from "fp-ts/lib/Apply";
import { log } from "fp-ts/lib/Console";
import { toError } from "fp-ts/lib/Either";
import * as E from "fp-ts/lib/Either";
import { eqString } from "fp-ts/lib/Eq";
import { IO, map as mapIO } from "fp-ts/lib/IO";
import { IOEither } from "fp-ts/lib/IOEither";
import * as IOE from "fp-ts/lib/IOEither";
import { Option } from "fp-ts/lib/Option";
import * as O from "fp-ts/lib/Option";
import { TaskEither, taskEither } from "fp-ts/lib/TaskEither";
import * as TE from "fp-ts/lib/TaskEither";
import { flow } from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";
import { createWriteStream, existsSync, readFile } from "fs";
import * as glob from "glob";
import * as path from "path";
import { Writable } from "stream";
import { promisify } from "util";
import { ConfigSpec, customConfig, defaultConfig } from "./Config";
import hacss from "./hacss";

const resolvePath = (p: string): IOEither<Error, string> => pipe(
  IOE.tryCatch(() => process.cwd(), toError),
  IOE.map(d => path.join(d, p)),
  IOE.filterOrElse(
    p => existsSync(p),
    p => new Error(`Does not exist: ${p}`)
  )
);

const loadConfig: (path: string) => IOEither<Error, ConfigSpec> = flow(
  path => IOE.tryCatch(() => require(path), toError),
  IOE.chain(flow(customConfig, E.mapLeft(toError), IOE.fromEither))
);

const globT: ((pattern: string) => TaskEither<Error, string[]>) =
  TE.taskify(glob);

const readFileUTF8T: (path: string) => TaskEither<Error, string> = flow(
  TE.taskify(readFile),
  TE.map((b: Buffer) => b.toString()),
  TE.mapLeft(toError)
);

const createWriteStreamSafe = (f: string): IOEither<Error, Writable> =>
  IOE.tryCatch(() => createWriteStream(f), toError);

export type Args = {
  config: Option<string>;
  output: Option<string>;
  sources: string;
};

export const build = (args: Args): TaskEither<Error, void> => {
  const config: IOEither<Error, ConfigSpec> = pipe(
    args.config,
    O.map(flow(IOE.right, IOE.chain(resolvePath), IOE.chain(loadConfig))),
    O.getOrElse(() =>
      pipe(
        resolvePath("hacss.config.js"),
        IOE.chain(loadConfig),
        IOE.alt(() => IOE.right(defaultConfig))
      )
    )
  );

  const sources: TaskEither<Error, string> = pipe(
    globT(args.sources),
    TE.chain(flow(map(readFileUTF8T), array.sequence(TE.taskEither))),
    TE.map(reduce("", (a, b) => a + "\n" + b))
  );

  const outputStream: IOEither<Error, Writable> = pipe(
    args.output,
    O.map(
      flow(
        IOE.right,
        IOE.chain(resolvePath),
        IOE.chain(createWriteStreamSafe)
      )
    ),
    O.getOrElse(() => IOE.right<Error, Writable>(process.stdout))
  );

  return pipe(
    sequenceT(taskEither)(
      sources,
      TE.fromIOEither(config),
      TE.fromIOEither(outputStream)
    ),
    TE.map(
      ([ sources, config, output ]) => { output.write(hacss(sources, config)); }
    )
  );

};

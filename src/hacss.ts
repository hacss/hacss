import { filterMap, map } from "fp-ts/lib/Array";
import { groupBy } from "fp-ts/lib/NonEmptyArray";
import { some } from "fp-ts/lib/Option";
import * as O from "fp-ts/lib/Option";
import * as R from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/pipeable";
import declarations from "./declarations";
import selector from "./selector";
import { ConfigSpec } from "./Config";
import { stylesFromCode } from "./Style";

const defaultConfig = require("../config/index.js");

const hacss = (code: string, config: ConfigSpec): string => pipe(
  stylesFromCode(code),
  filterMap(style => pipe(
    style,
    declarations(config),
    O.chain(decls => some([style.scope, `${selector(style)} { ${decls} }`]))
  )),
  groupBy(([a, b]) => a),
  R.map(map(x => x[1])),
  x => JSON.stringify(x, null, 2),
);

const result =
  hacss(`<h1 class="foo:a_C(red):h Asdf(hi) Bgc(#fff) Bgc(#eee)--sm">Hello</h1>`, defaultConfig());


console.log(result);

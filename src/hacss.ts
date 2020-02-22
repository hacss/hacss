import { filterMap, map, reduce, sortBy } from "fp-ts/lib/Array";
import { flow } from "fp-ts/lib/function";
import { groupBy } from "fp-ts/lib/NonEmptyArray";
import { some } from "fp-ts/lib/Option";
import * as O from "fp-ts/lib/Option";
import { fromCompare } from "fp-ts/lib/Ord";
import * as R from "fp-ts/lib/Record";
import { pipe } from "fp-ts/lib/pipeable";
import * as postcss from "postcss";
import * as nested from "postcss-nested";
import * as prettier from "prettier";
import declarations from "./declarations";
import selector from "./selector";
import { ConfigSpec } from "./Config";
import { stylesFromCode } from "./Style";

const hacss = (code: string, config: ConfigSpec): string => pipe(
  stylesFromCode(code),
  filterMap(style => pipe(
    style,
    declarations(config),
    O.chain(decls => some([style.scope, `${selector(style)} { ${decls} }`]))
  )),
  groupBy(([a, b]) => a),
  R.map(flow(map(x => x[1]), reduce("", (a, b) => a + "\n" + b))),
  R.toArray,
  sortBy([
    fromCompare(([a], [b]) => a === "default" ? -1 : b === "default" ? 1 : 0)
  ]),
  filterMap(([scope, css]) => pipe(
    O.fromNullable(config.scopes[scope]),
    O.filter(scope => typeof scope === "function"),
    O.chain(scope => some(scope(css)))
  )),
  reduce("", (a, b) => a + "\n" + b),
  x => postcss([nested]).process(x).css,
  x => prettier.format(x, { parser: "css" })
);

export default hacss;

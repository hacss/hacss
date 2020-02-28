import { sequenceS } from "fp-ts/lib/Apply";
import { array, head } from "fp-ts/lib/Array";
import * as Opt from "fp-ts/lib/Option";
import { Option, option } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { mkOperator, Operator } from "./Operator";
import { mkPseudo, Pseudo } from "./Pseudo";

export type Context = {
  className: string,
  operator: Operator,
  pseudos: Pseudo[],
};

export const mkContext = (c: string): Option<Context> =>
  sequenceS(option)({
    className: pipe(
      Opt.fromNullable(c.match(/[^\:_\+\>]+/)),
      Opt.chain(head)
    ),
    operator: pipe(
      Opt.fromNullable(c.match(/[_\+\>]$/)),
      Opt.chain(head),
      Opt.chain(mkOperator)
    ),
    pseudos: pipe(
      Opt.fromNullable(c.match(/\:{1,2}[a-z]+/g)),
      Opt.chain(x => array.traverse(option)(x, mkPseudo))
    )
  });

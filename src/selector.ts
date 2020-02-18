import { array } from "fp-ts/lib/Array";
import { Option, option } from "fp-ts/lib/Option";
import { Context } from "./Context";
import { Pseudo } from "./Pseudo";
import * as P from "./Pseudo";
import * as Op from "./Operator";

type Spec = { className: string, pseudos: Pseudo[] };

const classWithPseudos = ({ className, pseudos }: Spec): string =>
  array.reduce(array.map(pseudos, P.cssRep), className, (a, b) => a + b);

export const selector = (x: Spec & { context: Option<Context> }) =>
  option.reduceRight(
    option.map(x.context, c => classWithPseudos(c) + Op.cssRep(c.operator)),
    classWithPseudos(x),
    (a, b) => a + b
  );

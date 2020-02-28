require("css.escape");

import { array } from "fp-ts/lib/Array";
import { Option, option } from "fp-ts/lib/Option";
import { Context } from "./context";
import * as Op from "./operator";
import * as P from "./pseudo";
import { Pseudo } from "./pseudo";

type Spec = { className: string, pseudos: Pseudo[] };

const classWithPseudos = ({ className, pseudos }: Spec): string =>
  array.reduce(
    array.map(pseudos, P.cssRep),
    `.${CSS.escape(className)}`,
    (a, b) => a + b
  );

const selector = (x: Spec & { context: Option<Context> }) =>
  option.reduceRight(
    option.map(x.context, c => classWithPseudos(c) + Op.cssRep(c.operator)),
    classWithPseudos(x),
    (a, b) => a + b
  );

export default selector;

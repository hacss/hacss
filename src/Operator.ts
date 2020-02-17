import { Option, some, none } from "fp-ts/lib/Option";

export type Operator = "_" | "+" | ">";

export const mkOperator = (s: string): Option<Operator> => {
  switch (s) {
    case "_":
    case "+":
    case ">":
      return some(s);
    default:
      return none;
  }
};

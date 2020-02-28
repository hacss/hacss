import { none, Option, some } from "fp-ts/lib/Option";

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

export const cssRep = (o: Operator) => {
  switch (o) {
    case "_":
      return " ";
    case "+":
      return " + ";
    case ">":
      return " > ";
  }
};

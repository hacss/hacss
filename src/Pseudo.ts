import { array } from "fp-ts/lib/Array";
import { Option, some, none } from "fp-ts/lib/Option";
import { fromCompare } from "fp-ts/lib/Ord";
import { Ordering } from "fp-ts/lib/Ordering";

const pseudos = <const>{
  ":a": ":active",
  ":c": ":checked",
  ":d": ":default",
  ":di": ":disabled",
  ":e": ":empty",
  ":en": ":enabled",
  ":f": ":focus",
  ":fc": ":first-child",
  ":fi": ":first",
  ":fot": ":first-of-type",
  ":fs": ":fullscreen",
  ":fw": ":focus-within",
  ":h": ":hover",
  ":ind": ":indeterminate",
  ":inv": ":invalid",
  ":ir": ":in-range",
  ":l": ":left",
  ":lc": ":last-child",
  ":li": ":link",
  ":lot": ":last-of-type",
  ":o": ":optional",
  ":oc": ":only-child",
  ":oor": ":out-of-range",
  ":oot": ":only-of-type",
  ":r": ":right",
  ":req": ":required",
  ":ro": ":read-only",
  ":rt": ":root",
  ":rw": ":read-write",
  ":s": ":scope",
  ":t": ":target",
  ":va": ":valid",
  ":vi": ":visited",
  "::a": "::after",
  "::b": "::before",
  "::fl": "::first-letter",
  "::fli": "::first-line",
  "::ph": "::placeholder"
};

export type Pseudo = keyof typeof pseudos;

export const mkPseudo = (s: string): Option<Pseudo> => {
  switch (s) {
    case ":a":
    case ":c":
    case ":d":
    case ":di":
    case ":e":
    case ":en":
    case ":f":
    case ":fc":
    case ":fi":
    case ":fot":
    case ":fs":
    case ":fw":
    case ":h":
    case ":ind":
    case ":inv":
    case ":ir":
    case ":l":
    case ":lc":
    case ":li":
    case ":lot":
    case ":o":
    case ":oc":
    case ":oor":
    case ":oot":
    case ":r":
    case ":req":
    case ":ro":
    case ":rt":
    case ":rw":
    case ":s":
    case ":t":
    case ":va":
    case ":vi":
    case "::a":
    case "::b":
    case "::fl":
    case "::fli":
    case "::ph":
      return some(s);
    default:
      return none;
  }
};

export const cssRep = (pseudo: Pseudo): string => pseudos[pseudo];

const priority = (p: Pseudo): number => {
  switch (p) {
    case ":li":
      return 0;
    case ":vi":
      return 1;
    case ":fw":
      return 2;
    case ":f":
      return 3;
    case ":h":
      return 4;
    case ":a":
      return 5;
    case ":di":
      return 6;
    default:
      return -1;
  }
};

const comparePseudos = (a: Pseudo[], b: Pseudo[]): Ordering => {
  if (a.length !== 0 && b.length === 0) {
    return 1;
  }
  if (a.length === 0 && b.length !== 0) {
    return -1;
  }
  const aix = Math.max.apply(null, array.map(a, ap => priority(ap)));
  const bix = Math.max.apply(null, array.map(b, bp => priority(bp)));
  if (aix < bix) {
    return -1;
  }
  if (aix > bix) {
    return 1;
  }
  return 0;
};

export const ordPseudos = fromCompare(comparePseudos);

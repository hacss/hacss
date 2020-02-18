import { Option, some, none } from "fp-ts/lib/Option";

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

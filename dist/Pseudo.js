"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = require("fp-ts/lib/Option");
exports.pseudos = {
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
exports.mkPseudo = (s) => {
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
            return Option_1.some(s);
        default:
            return Option_1.none;
    }
};

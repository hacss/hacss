"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Array_1 = require("fp-ts/lib/Array");
const Option_1 = require("fp-ts/lib/Option");
const pipeable_1 = require("fp-ts/lib/pipeable");
const attachRules = (styles, rules) => Array_1.array.filterMap(styles, style => {
    const { ruleName, args } = style;
    return pipeable_1.pipe(Option_1.fromNullable(rules[ruleName]), Option_1.chain(ruleDef => {
        switch (typeof ruleDef) {
            case "function":
                if (args.length === 0) {
                    return Option_1.none;
                }
                return Option_1.some({ ...style, f: ruleDef });
            case "string":
                if (args.length !== 0) {
                    return Option_1.none;
                }
                return Option_1.some({ ...style, f: () => ruleDef });
            case "object":
                const ruleDefSub = ruleDef[args.length];
                if (ruleDefSub === null) {
                    return Option_1.none;
                }
                switch (typeof ruleDefSub) {
                    case "function":
                        if (args.length === 0) {
                            return Option_1.none;
                        }
                        return Option_1.some({ ...style, f: ruleDefSub });
                    case "string":
                        if (args.length !== 0) {
                            return Option_1.none;
                        }
                        return Option_1.some({ ...style, f: () => ruleDefSub });
                    default:
                        return Option_1.none;
                }
            default:
                return Option_1.none;
        }
    }));
});

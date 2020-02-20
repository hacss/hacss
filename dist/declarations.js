"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = require("fp-ts/lib/Option");
const pipeable_1 = require("fp-ts/lib/pipeable");
const declarations = ({ rules, globalMapArg, globalMapOutput }) => (style) => {
    const ruleName = style.ruleName;
    const args = style.args.map((a, i) => globalMapArg(a, ruleName, i));
    return pipeable_1.pipe(Option_1.fromNullable(rules[ruleName]), Option_1.chain(ruleDef => {
        switch (typeof ruleDef) {
            case "function":
                if (args.length === 0) {
                    return Option_1.none;
                }
                return Option_1.some(ruleDef.apply(null, args));
            case "string":
                if (args.length !== 0) {
                    return Option_1.none;
                }
                return Option_1.some(ruleDef);
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
                        return Option_1.some(ruleDefSub.apply(null, args));
                    case "string":
                        if (args.length !== 0) {
                            return Option_1.none;
                        }
                        return Option_1.some(ruleDefSub);
                    default:
                        return Option_1.none;
                }
            default:
                return Option_1.none;
        }
    }), Option_1.map(decls => globalMapOutput(decls, ruleName)
        .replace(/__START__/g, "left")
        .replace(/__END__/g, "right")));
};
exports.default = declarations;

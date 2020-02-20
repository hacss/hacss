import { Option, chain, fromNullable, map, none, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { ConfigSpec } from "./Config";
import { RuleSpec } from "./Rule";
import { Style } from "./Style";

const declarations =
  ({ rules, globalMapArg, globalMapOutput }: ConfigSpec) =>
    (style: Style): Option<string> => {
      const ruleName = style.ruleName;
      const args = style.args.map((a, i) => globalMapArg(a, ruleName, i));
      return pipe(
        fromNullable(rules[ruleName]),
        chain(ruleDef => {
          switch (typeof ruleDef) {
            case "function":
              if (args.length === 0) {
                return none;
              }
              return some(ruleDef.apply(null, args));
            case "string":
              if (args.length !== 0) {
                return none;
              }
              return some(ruleDef);
            case "object":
              const ruleDefSub = ruleDef[args.length];
              if (ruleDefSub === null) {
                return none;
              }
              switch (typeof ruleDefSub) {
                case "function":
                  if (args.length === 0) {
                    return none;
                  }
                  return some(ruleDefSub.apply(null, args));
                case "string":
                  if (args.length !== 0) {
                    return none;
                  }
                  return some(ruleDefSub);
                default:
                  return none;
              }
            default:
              return none;
          }
        }),
        map(decls =>
          globalMapOutput(decls, ruleName)
             .replace(/__START__/g, "left")
             .replace(/__END__/g, "right")
        ),
      );
    };

export default declarations;

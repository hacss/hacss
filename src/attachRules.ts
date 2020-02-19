import { array } from "fp-ts/lib/Array";
import { chain, fromNullable, none, some } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/pipeable";
import { RuleFn, RuleSpec } from "./Rule";
import { Style } from "./Style";

type StyleWithRule = Style & { f: RuleFn };

const attachRules =
  (styles: Style[], rules: { [ruleName: string]: RuleSpec }): StyleWithRule[] =>
  array.filterMap(styles, style => {
    const { ruleName, args } = style;
    return pipe(
      fromNullable(rules[ruleName]),
      chain(ruleDef => {
        switch (typeof ruleDef) {
          case "function":
            if (args.length === 0) {
              return none;
            }
            return some({ ...style, f: ruleDef });
          case "string":
            if (args.length !== 0) {
              return none;
            }
            return some({ ...style, f: () => ruleDef });
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
                return some({ ...style, f: ruleDefSub });
              case "string":
                if (args.length !== 0) {
                  return none;
                }
                return some({ ...style, f: () => ruleDefSub });
              default:
                return none;
            }
          default:
            return none;
        }
      })
  );
});

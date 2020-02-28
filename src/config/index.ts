import * as E from "fp-ts/lib/Either";
import { Either, left, right } from "fp-ts/lib/Either";
import { flow } from "fp-ts/lib/function";
import { RuleSpec } from "../rule";
import rules from "./rules";
import scopes from "./scopes";

export type ConfigSpec = {
  rules: { [ruleName: string]: RuleSpec };
  scopes: { [scopeName: string]: (css: string) => string };
  globalMapArg: (value: string, ruleName: string, argIndex: number) => string;
  globalMapOutput: (output: string, ruleName: string) => string;
};

export type Config =
  | Partial<ConfigSpec>
  | ((defaultConfig: ConfigSpec) => Partial<ConfigSpec>);

export const defaultConfig: ConfigSpec = {
  rules,
  scopes,
  globalMapArg: (x: string) => x,
  globalMapOutput: (x: string) => x,
};

const mergeConfigWithDefault = (config: Partial<ConfigSpec>): ConfigSpec => ({
  globalMapArg: config.globalMapArg || defaultConfig.globalMapArg,
  globalMapOutput: config.globalMapOutput || defaultConfig.globalMapOutput,
  rules: {
    ...defaultConfig.rules,
    ...config.rules,
  },
  scopes: {
    ...defaultConfig.scopes,
    ...config.scopes,
  },
});

export const customConfig: (
  config: Config,
) => Either<string, ConfigSpec> = flow(
  E.fromNullable("Configuration cannot be null."),
  E.chain(c => {
    switch (typeof c) {
      case "object":
        return right(c);
      case "function":
        return right(c(defaultConfig));
      default:
        return left("Configuration must be either an object or a function.");
    }
  }),
  E.map(mergeConfigWithDefault),
);

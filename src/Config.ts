import { RuleSpec } from "./Rule";

export type ConfigSpec = {
  rules: { [ruleName: string]: RuleSpec },
  scopes: { [scopeName: string]: (css: string) => string },
  globalMapArg: (value: string, ruleName: string, argIndex: number) => string,
  globalMapOutput: (output: string, ruleName: string) => string,
}

export type Config = Partial<ConfigSpec> | ((defaultConfig: ConfigSpec) => Partial<ConfigSpec>);

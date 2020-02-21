import { RuleSpec } from "../Rule";
import rules from "./rules";
import scopes from "./scopes";

export type ConfigSpec = {
  rules: { [ruleName: string]: RuleSpec },
  scopes: { [scopeName: string]: (css: string) => string },
  globalMapArg: (value: string, ruleName: string, argIndex: number) => string,
  globalMapOutput: (output: string, ruleName: string) => string,
}

export type Config
  = Partial<ConfigSpec>
  | ((defaultConfig: ConfigSpec) => Partial<ConfigSpec>)
  ;

const defaultConfig: ConfigSpec = <const>{
  rules,
  scopes,
  globalMapArg: (x: string) => x,
  globalMapOutput: (x: string) => x
};

export const customConfig = (config: Config): ConfigSpec => {
  let custom;
  switch (typeof config) {
    case "function":
      custom = config(defaultConfig);
      break;
    case "object":
      custom = config;
      break;
    default:
      throw new Error("Invalid config type.");
  }
  return {
    globalMapArg: custom.globalMapArg || defaultConfig.globalMapArg,
    globalMapOutput: custom.globalMapOutput || defaultConfig.globalMapOutput,
    scopes: {
      ...defaultConfig.scopes,
      ...custom.scopes
    },
    rules: {
      ...defaultConfig.rules,
      ...custom.rules
    }
  };
};

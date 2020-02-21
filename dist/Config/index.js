"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules_1 = require("./rules");
const scopes_1 = require("./scopes");
const defaultConfig = {
    rules: rules_1.default,
    scopes: scopes_1.default,
    globalMapArg: (x) => x,
    globalMapOutput: (x) => x
};
exports.customConfig = (config) => {
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const E = require("fp-ts/lib/Either");
const Either_1 = require("fp-ts/lib/Either");
const function_1 = require("fp-ts/lib/function");
const rules_1 = require("./rules");
const scopes_1 = require("./scopes");
exports.defaultConfig = {
    rules: rules_1.default,
    scopes: scopes_1.default,
    globalMapArg: (x) => x,
    globalMapOutput: (x) => x,
};
const mergeConfigWithDefault = (config) => ({
    globalMapArg: config.globalMapArg || exports.defaultConfig.globalMapArg,
    globalMapOutput: config.globalMapOutput || exports.defaultConfig.globalMapOutput,
    rules: {
        ...exports.defaultConfig.rules,
        ...config.rules,
    },
    scopes: {
        ...exports.defaultConfig.scopes,
        ...config.scopes,
    },
});
exports.customConfig = function_1.flow(E.fromNullable("Configuration cannot be null."), E.chain(c => {
    switch (typeof c) {
        case "object":
            return Either_1.right(c);
        case "function":
            return Either_1.right(c(exports.defaultConfig));
        default:
            return Either_1.left("Configuration must be either an object or a function.");
    }
}), E.map(mergeConfigWithDefault));

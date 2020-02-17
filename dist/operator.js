"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = require("fp-ts/lib/Option");
exports.mkOperator = (s) => {
    switch (s) {
        case "_":
        case "+":
        case ">":
            return Option_1.some(s);
        default:
            return Option_1.none;
    }
};

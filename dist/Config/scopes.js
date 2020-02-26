"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scopes = {
    default: (content) => content,
    sm: (content) => {
        return `@media only screen and (max-width: 599px) { ${content} }`;
    },
    md: (content) => {
        return `@media only screen and (min-width: 600px) and (max-width: 999px) { ${content} }`;
    },
    lg: (content) => {
        return `@media only screen and (min-width: 1000px) { ${content} }`;
    },
};
exports.default = scopes;

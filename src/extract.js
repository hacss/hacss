"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var extract = function (code) {
    return Array.from(code["matchAll"](/(?<context>\w+((\:{1,2}[a-z]+)+)?[_\+\>)])?(?<rule>[A-Z][A-Za-z]*)(\((?<args>(([^\(\)]+|(attr|calc|url)\([^\(\)]+\)),)*(([^\(\)]+|(attr|calc|url)\([^\(\)]+\))))\))?(?<pseudos>(\:{1,2}[a-z]+)+)?(\-\-(?<scope>[A-Za-z]+))?(?=(['"\s\\])|$)/gm))
        .reduce(function (ms, m) { return (ms.some(function (n) { return n[0] === m[0]; }) ? ms : ms.concat([m])); }, [])
        .map(function (match) { return (__assign({ className: match[0] }, match.groups)); })
        .map(function (props) { return (__assign(__assign({}, props), { scope: props.scope || "default", context: props.context
            ? {
                className: props.context.match(/[^\:_\+\>]+/)[0],
                operator: props.context[props.context.length - 1],
                pseudos: props.context.match(/\:{1,2}[a-z]+/g)
            }
            : null, args: props.args ? props.args.split(",") : [], pseudos: props.pseudos ? props.pseudos.match(/(\:{1,2}[a-z]+)/g) : null })); });
};
exports["default"] = extract;

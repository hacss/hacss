"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Array_1 = require("fp-ts/lib/Array");
const Eq_1 = require("fp-ts/lib/Eq");
const Option_1 = require("fp-ts/lib/Option");
const O = require("fp-ts/lib/Option");
const Ord_1 = require("fp-ts/lib/Ord");
const function_1 = require("fp-ts/lib/function");
const pipeable_1 = require("fp-ts/lib/pipeable");
const Context_1 = require("./Context");
const Pseudo_1 = require("./Pseudo");
exports.stylesFromCode = (code) => {
    const matchEq = Eq_1.fromEquals((a, b) => a[0] === b[0]);
    const matches = Array_1.array.filterMap(Array_1.uniq(matchEq)(Array.from(code.matchAll(/(?<context>\w+((\:{1,2}[a-z]+)+)?[_\+\>)])?(?<ruleName>[A-Z][A-Za-z]*)(\((?<args>(([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\)),)*(([^\(\)]+|([a-z][a-z\-]+[a-z])\([^\(\)]+\))))\))?(?<pseudos>(\:{1,2}[a-z]+)+)?(\-\-(?<scope>[A-Za-z]+))?(?=(['"\s\\])|$)/gm))), match => match.groups
        ? Option_1.some([match[0], match.groups])
        : Option_1.none);
    const styles = Array_1.array.map(matches, ([className, groups]) => ({
        className,
        context: pipeable_1.pipe(O.fromNullable(groups["context"]), O.chain(Context_1.mkContext)),
        ruleName: groups["ruleName"],
        args: pipeable_1.pipe(O.fromNullable(groups["args"]), O.chain(x => Option_1.some(Array
            .from(x.matchAll(/(?:[^,]+\([^\)]+\)|[^,]+)/g))
            .map(([x]) => x))), Option_1.getOrElse(() => [])),
        pseudos: pipeable_1.pipe(O.fromNullable(groups["pseudos"]), O.chain(pseudos => O.fromNullable(pseudos.match(/\:{1,2}[a-z]+/g))), O.chain(x => Array_1.array.traverse(Option_1.option)(x, Pseudo_1.mkPseudo)), Option_1.getOrElse(() => [])),
        scope: pipeable_1.pipe(O.fromNullable(groups["scope"]), O.getOrElse(() => "default"))
    }));
    const getStyleContextPseudos = function_1.flow(x => x.context, O.map(c => c.pseudos), Option_1.getOrElse(() => []));
    const getStylePseudos = (x) => x.pseudos;
    return Array_1.sortBy([
        Ord_1.ord.contramap(Pseudo_1.ordPseudos, getStyleContextPseudos),
        Ord_1.ord.contramap(Pseudo_1.ordPseudos, getStylePseudos)
    ])(styles);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Array_1 = require("fp-ts/lib/Array");
const NonEmptyArray_1 = require("fp-ts/lib/NonEmptyArray");
const Option_1 = require("fp-ts/lib/Option");
const O = require("fp-ts/lib/Option");
const Ord_1 = require("fp-ts/lib/Ord");
const R = require("fp-ts/lib/Record");
const pipeable_1 = require("fp-ts/lib/pipeable");
const postcss = require("postcss");
const nested = require("postcss-nested");
const prettier = require("prettier");
const declarations_1 = require("./declarations");
const selector_1 = require("./selector");
const Style_1 = require("./Style");
const defaultConfig = require("../config/index.js");
const hacss = (code, config) => pipeable_1.pipe(Style_1.stylesFromCode(code), Array_1.filterMap(style => pipeable_1.pipe(style, declarations_1.default(config), O.chain(decls => Option_1.some([style.scope, `${selector_1.default(style)} { ${decls} }`])))), NonEmptyArray_1.groupBy(([a, b]) => a), R.map(x => pipeable_1.pipe(x, Array_1.map(x => x[1]), Array_1.reduce("", (a, b) => a + "\n" + b))), R.toArray, Array_1.sortBy([
    Ord_1.fromCompare(([a], [b]) => a === "default" ? -1 : b === "default" ? 1 : 0)
]), Array_1.filterMap(([scope, css]) => pipeable_1.pipe(O.fromNullable(config.scopes[scope]), O.filter(scope => typeof scope === "function"), O.chain(scope => Option_1.some(scope(css))))), Array_1.reduce("", (a, b) => a + "\n" + b), x => postcss([nested]).process(x).css, x => prettier.format(x, { parser: "css" }));
const result = hacss(`<h1 class="foo:a_C(red):h Asdf(hi) Bgc(#fff) Bgc(#eee)--sm">Hello</h1>`, defaultConfig());
console.log(result);

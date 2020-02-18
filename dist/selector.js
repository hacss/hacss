"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("css.escape");
const Array_1 = require("fp-ts/lib/Array");
const Option_1 = require("fp-ts/lib/Option");
const P = require("./Pseudo");
const Op = require("./Operator");
const classWithPseudos = ({ className, pseudos }) => Array_1.array.reduce(Array_1.array.map(pseudos, P.cssRep), CSS.escape(className), (a, b) => a + b);
exports.selector = (x) => Option_1.option.reduceRight(Option_1.option.map(x.context, c => classWithPseudos(c) + Op.cssRep(c.operator)), classWithPseudos(x), (a, b) => a + b);

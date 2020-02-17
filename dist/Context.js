"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Apply_1 = require("fp-ts/lib/Apply");
const Array_1 = require("fp-ts/lib/Array");
const Option_1 = require("fp-ts/lib/Option");
const Opt = require("fp-ts/lib/Option");
const pipeable_1 = require("fp-ts/lib/pipeable");
const Operator_1 = require("./Operator");
const Pseudo_1 = require("./Pseudo");
exports.mkContext = (c) => Apply_1.sequenceS(Option_1.option)({
    className: pipeable_1.pipe(Opt.fromNullable(c.match(/[^\:_\+\>]+/)), Opt.chain(Array_1.head)),
    operator: pipeable_1.pipe(Opt.fromNullable(c.match(/[_\+\>]$/)), Opt.chain(Array_1.head), Opt.chain(Operator_1.mkOperator)),
    pseudos: pipeable_1.pipe(Opt.fromNullable(c.match(/\:{1,2}[a-z]+/g)), Opt.chain(x => Array_1.array.traverse(Option_1.option)(x, Pseudo_1.mkPseudo)))
});

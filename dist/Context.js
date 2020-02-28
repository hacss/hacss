"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Apply_1 = require("fp-ts/lib/Apply");
const Array_1 = require("fp-ts/lib/Array");
const Opt = require("fp-ts/lib/Option");
const Option_1 = require("fp-ts/lib/Option");
const pipeable_1 = require("fp-ts/lib/pipeable");
const operator_1 = require("./operator");
const pseudo_1 = require("./pseudo");
exports.mkContext = (c) => Apply_1.sequenceS(Option_1.option)({
    className: pipeable_1.pipe(Opt.fromNullable(c.match(/[^\:_\+\>]+/)), Opt.chain(Array_1.head)),
    operator: pipeable_1.pipe(Opt.fromNullable(c.match(/[_\+\>]$/)), Opt.chain(Array_1.head), Opt.chain(operator_1.mkOperator)),
    pseudos: pipeable_1.pipe(Opt.fromNullable(c.match(/\:{1,2}[a-z]+/g)), Opt.chain(x => Array_1.array.traverse(Option_1.option)(x, pseudo_1.mkPseudo)))
});

const { map, replace } = require("ramda");

module.exports = map(replace(/__/g, " "));

const fs = require("fs");
const rules = require("./rules.js");
const scopes = require("./scopes.js");

module.exports = configPath => {
  const globalMapOutput = f => (x, r) => f(
    x
      .replace(/__START__/g, "left")
      .replace(/__END__/g, "right"),
    r
  );

  if (fs.existsSync(configPath)) {
    const custom = (c => (typeof c === "function" ? c(defaults) : c))(
      require(configPath),
    );

    return {
      globalMapArg: custom.globalMapArg || (x => x),
      globalMapOutput: globalMapOutput(custom.globalMapOutput || (x => x)),
      scopes: {
        ...scopes,
        ...custom.scopes,
      },
      rules: {
        ...rules,
        ...custom.rules,
      },
    };
  }

  return defaults;
};

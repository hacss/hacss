const fs = require("fs");
const rules = require("./rules.js");
const scopes = require("./scopes.js");

const defaults = {
  globalMapArg: x => x,
  globalMapOutput: x => x,
  rules,
  scopes,
};

module.exports = configPath => {
  const globalMapOutput = f => (x, r) => f(
    x
      .replace(/__START__/g, "left")
      .replace(/__END__/g, "right"),
    r
  );

  if (configPath && fs.existsSync(configPath)) {
    const custom = (c => (typeof c === "function" ? c(defaults) : c))(
      require(configPath),
    );

    return {
      ...defaults,
      globalMapArg: custom.globalMapArg || defaults.globalMapArg,
      globalMapOutput: globalMapOutput(custom.globalMapOutput || defaults.globalMapOutput),
      scopes: {
        ...defaults.scopes,
        ...custom.scopes,
      },
      rules: {
        ...defaults.rules,
        ...custom.rules,
      },
    };
  }

  return defaults;
};

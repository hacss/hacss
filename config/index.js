const fs = require("fs");
const rules = require("./rules.js");
const scopes = require("./scopes.js");

module.exports = configPath => {
  const defaults = {
    globalMapArg: x => x,
    globalMapOutput: x =>
      x
        .replace(/__START__/g, "left")
        .replace(/__END__/g, "right"),
    rules,
    scopes,
  };

  if (fs.existsSync(configPath)) {
    const custom = (c => (typeof c === "function" ? c(defaults) : c))(
      require(configPath),
    );

    return {
      ...defaults,
      ...custom,
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

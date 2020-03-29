module.exports = {
  extends: ["prettier"],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "comma-dangle": ["error", "always-multiline"],
  },
};

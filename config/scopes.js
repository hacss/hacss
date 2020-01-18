module.exports = {
  default: content => content,
  sm: content => `@media only screen and (max-width: 599px) { ${content} }`,
  md: content =>
    `@media only screen and (min-width: 600px) and (max-width: 999px) { ${content} }`,
  lg: content => `@media only screen and (min-width: 1000px) { ${content} }`,
};

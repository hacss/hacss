exports.rules = {
  Bd: () => "border: 1px solid #000",
  Bgc: color => `background-color: ${color}`,
  C: color => `color: ${color}`,
  Fz: size => `font-size: ${size}`,
  H: height => `height: ${height}`,
  Lh: lh => `line-height: ${lh}`,
  O: (size, color) => `
    box-shadow: 0 0 0 ${size} ${color};
    outline: 0;
  `,
  Ta: ta => ta === "c" ? `text-align: center` : "",
  W: width => `width: ${width}`,
};

exports.scopes = {
  "default": content => content,
  sm: content => `@media only screen and (max-width: 599px) { ${content} }`,
  md: content => `@media only screen and (min-width: 600px) and (max-width: 999px) { ${content} }`,
  lg: content => `@media only screen and (min-width: 1000px) { ${content} }`,
};

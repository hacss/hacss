const scopes = <const>{
  "default": (content: string) => content,
  sm: (content: string) => {
    return `@media only screen and (max-width: 599px) { ${content} }`;
  },
  md: (content: string) => {
    return `@media only screen and (min-width: 600px) and (max-width: 999px) { ${content} }`;
  },
  lg: (content: string) => {
    return `@media only screen and (min-width: 1000px) { ${content} }`;
  },
};

export default scopes;

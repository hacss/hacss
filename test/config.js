module.exports = {
  mediaQueries: {
    "medium": "only screen and (min-width: 600px) and (max-width: 1199px)",
    "large": "only screen and (min-width: 1200px)",
  },
  plugins: [
    decls => {
      if ("font-family" in decls) {
        decls["font-family"] =
          decls["font-family"].replace("sans-serif", "'Inter', sans-serif");
      }
      return decls;
    },
  ],
};

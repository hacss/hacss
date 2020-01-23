# Hacss + Webpack

Hacss can be easily integrated into Webpack projects via
[val-loader](https://webpack.js.org/loaders/val-loader/),
[css-loader](https://webpack.js.org/loaders/css-loader/), and
[style-loader](https://webpack.js.org/loaders/style-loader/).

After installing `hacss` and the required Webpack loaders, make a few simple
changes to your Webpack configuration.

First, add an entry:

```javascript
module.exports = {
  entry: ["./src/main.js", "hacss/output"]
  ...
};
```

Next, add a rule, making sure to replace `src/*.jsx` with a glob pattern that
captures any source files that may contain Hacss classes.

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /hacss\/output/,
        use: [
          "style-loader",
          "css-loader",
          { loader: "val-loader", options: { sources: "src/*.jsx" } },
        ],
      }
    ],
  },
};
```

A Hacss-generated stylesheet will now be added to the page automatically. At this
point, you can add a `hacss.config.js` file alongside `webpack.config.js` if
necessary; or, you can specify an additional `val-loader` option `config` which
contains the path to your Hacss configuration file.

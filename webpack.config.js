const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

module.exports = {
  entry: ["./output.js", "./site.js"],
  output: {
    path: path.join(__dirname, "site"),
    filename: "app.js",
  },
  mode: "production",
  plugins: [
    new CopyPlugin([
      {
        from: "node_modules/ace-builds/src-min/**/*",
        to: "ace",
        flatten: true,
      },
    ]),
    new HtmlPlugin({
      title: "Hacss Playground",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
    }),
    new HtmlIncludeAssetsPlugin({
      assets: ["ace/ace.js"],
      append: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /output\.js$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "val-loader",
            options: {
              sources: "./site.js",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "raw-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\/test\/index\.html$/,
        use: [
          {
            loader: "string-replace-loader",
            options: {
              search: `<link rel="stylesheet" href="styles.css" />\n`,
              replace: "",
            },
          },
        ],
      },
    ],
  },
};

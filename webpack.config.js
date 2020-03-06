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
      { from: "node_modules/prettier/standalone.js", to: "prettier" },
      { from: "node_modules/prettier/parser-postcss.js", to: "prettier" },
    ]),
    new HtmlPlugin({ title: "Hacss Playground" }),
    new HtmlIncludeAssetsPlugin({
      assets: [
        "ace/ace.js",
        "prettier/standalone.js",
        "prettier/parser-postcss.js",
      ],
      append: false,
    }),
  ],
  externals: {
    "prettier/standalone": "prettier",
    "prettier/parser-postcss": "prettierPlugins.postcss",
  },
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

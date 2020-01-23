# Hacss configuration

Both the CLI and the [Webpack integration](webpack.md) will look for a
`hacss.config.js` file in the working directory (i.e. the project root). You can
specify an alternate configuration file path by using the explicit `config`
option. See the CLI and Webpack guides for more information.

Your configuration file may export either a configuration object or a function
that returns a configuration object. In the case of a function, Hacss will pass
its default configuration object as an argument, allowing you to create custom
rules, scopes, and other configuration easily on the basis of defaults. In
either case, custom configuration is applied on top of the default
configuration, so it is possible and even preferable to export a partial
configuration object reflecting only differences from the default configuration.

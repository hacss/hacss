# Hacss CLI

The [`hacss`](http://npmjs.com/package/hacss) package is bundled with a CLI.

## Installation

### Global
```bash
npm install -g hacss
```
### Local
```bash
npm install hacss
```

## Usage
```bash
hacss [--config <config-file>] [--output <output-file>] <sources>
```

### Options

#### ```[--config <config-file>]```
When specified, Hacss will look for `<config-file>` instead of its default
`hacss.config.js`. It is not strictly necessary to have a configuration file, as
Hacss is bundled with default rules. See the [configuration guide](config.md)
for more details.

#### ```[--output <output-file>]```
When specified, Hacss will write its output to the specified file. When not
specified, Hacss output will be written to the standard output.

#### <sources>
The [glob](https://www.npmjs.com/package/glob) pattern specified here will be used to search for source files from
which to produce the stylesheet.

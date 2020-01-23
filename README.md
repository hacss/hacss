# hacss
Hackable inline style language embedded in HTML classes

While many consider inline styles to be, in essence, more maintainable than
external stylesheets, the limited capabilities of vanilla inline styles (e. g.
no media queries or pseudo-selectors) often force a project to use external
stylesheets or to resort to JavaScript for responsive designs or even trivial
state changes (e. g. changing the color of a button on hover).

Hacss, inspired by [acss.io](https://acss.io), captures the maintainability
benefits of inline styles as well as the capabilities of external stylesheets by
embedding its own styling DSL within HTML `class` attributes. At build time,
Hacss automatically generates a stylesheet from the CSS classes used throughout
the project: `<h1 class="C(red)">Hello World</h1>`, for example, yields a CSS
block `.C\(red\) { color: red; }`.

Hacss is a drop-in replacement for
[Atomizer](https://github.com/acss-io/atomizer) for the majority of use cases.
In general, the "Atomic" and "Helper" classes listed on the
[acss.io Reference page](http://acss.io/reference.html) are applicable to Hacss
as well.

Hacss may be a better option than Atomizer for non-basic use cases:

1. Simpler configuration model. Hacss combines
   ["rules"](https://github.com/acss-io/atomizer/blob/master/src/rules.js)
   (aka "atomic classes") and
   ["helpers"](https://github.com/acss-io/atomizer/blob/master/src/helpers.js)
   into a single concept of a [rule](guides/config.md#rules). Verbose schemas for
   defining "rules" and "helpers" are replaced with a simple map between a rule
   name and, typically, the function used to generate the corresponding styles.
2. Where Atomizer
   [prevents changing of the rules](https://github.com/acss-io/atomizer/search?q=already+exists+with+a+different&unscoped_q=already+exists+with+a+different),
   Hacss makes redefining rules easy. A common use case for this would be to
   re-implement
   [`O` (outline)](https://github.com/nsaunders/hacss/search?q=outline&unscoped_q=outline)
   using `box-shadow` as described
   [here](https://dev.to/hybrid_alex/better-css-outlines-with-box-shadows-1k7j).
3. Hacss configuration is function-oriented, offering greater control and
   flexibility. Instead of
   [`breakPoints`](https://github.com/acss-io/atomizer/blob/fc0d460e2e0f82acaa3d626da03193b9895c8010/examples/example-config.js#L15),
   for example, Hacss has [`scopes`](guides/config.md#scopes) which can be used
   for media queries; however, when combined with another CSS preprocessor such
   as Less, Sass, or PostCSS, `scopes` enable additional use cases such as
   nesting under a parent selector for namespacing, etc. Instead of a
   [map of global variables](https://github.com/acss-io/atomizer/blob/fc0d460e2e0f82acaa3d626da03193b9895c8010/examples/example-config.js#L6),
   Hacss uses [`globalMapArg`](guides/config.md#globalMapArg) to allow global
   variable lookups as well as other transformations.

For more, see the [guides](./guides).

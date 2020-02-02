# hacss ![Build status](https://travis-ci.org/nsaunders/hacss.svg?branch=master)
## Hackable inline style language embedded in HTML classes

While many consider inline styles to be, in essence, more maintainable than
external stylesheets, the limited capabilities of vanilla inline styles (e. g.
no media queries or pseudo-selectors) often force a project to use external
stylesheets or to resort to JavaScript for even trivial state changes (like
changing the color of a button on hover) or responsive designs. Moreover,
JavaScript cannot replace stylesheets completely, as it offers no direct way
to style pseudo-elements such as input placeholders.

--------------------------------------------------------------------------------
Hacss combines the maintainability benefits of inline styles with the
capabilities of external stylesheets by embedding its own styling DSL within
HTML `class` attributes. At build time, Hacss automatically generates a
stylesheet from the CSS classes used throughout the project:
`<h1 class="C(red)">Hello World</h1>`, for example, yields a CSS block
`.C\(red\) { color: red; }`.

Hacss, inspired by [acss.io](https://acss.io), is a drop-in replacement for its
[Atomizer](https://github.com/acss-io/atomizer) tool for the majority of use
cases. In general, the "Atomic" and "Helper" classes listed on the
[acss.io Reference page](http://acss.io/reference.html) are applicable to Hacss
as well. Hacss may be a better option than Atomizer for non-basic use cases for
a few reasons:

1. Simpler configuration model. Hacss combines
   ["rules"](https://github.com/acss-io/atomizer/blob/master/src/rules.js)
   (aka "atomic classes") and
   ["helpers"](https://github.com/acss-io/atomizer/blob/master/src/helpers.js)
   into a single concept of a [rule](guides/config.md#rules). Verbose schemas
   for defining "rules" and "helpers" are replaced by a simple map between a
   rule name and its definition (typically a function used to generate the
   corresponding styles).
2. Where Atomizer
   [blocks attempts to change rules](https://github.com/acss-io/atomizer/search?q=already+exists+with+a+different&unscoped_q=already+exists+with+a+different),
   Hacss makes redefining rules easy. A common use case for this would be to
   re-implement
   [`O` (outline)](https://github.com/nsaunders/hacss/search?q=outline&unscoped_q=outline)
   using `box-shadow` as described
   [here](https://dev.to/hybrid_alex/better-css-outlines-with-box-shadows-1k7j).
3. Hacss configuration is function-oriented, offering greater control and
   flexibility. Instead of
   [`breakPoints`](https://github.com/acss-io/atomizer/blob/fc0d460e2e0f82acaa3d626da03193b9895c8010/examples/example-config.js#L15),
   for example, Hacss's [`scopes`](guides/config.md#scopes) can be used not only
   for media queries, but also for other use cases requiring grouping/nesting
   (such as nesting a block of CSS under a parent selector<sup>1</sup> for
   namespacing purposes). Instead of a
   [map of global variables](https://github.com/acss-io/atomizer/blob/fc0d460e2e0f82acaa3d626da03193b9895c8010/examples/example-config.js#L6),
   Hacss uses [`globalMapArg`](guides/config.md#globalMapArg) to allow global
   variable lookups as well as other transformations.

For more, see the [guides](./guides).

<sup>1</sup> This requires post-processing by a tool such as Less, Sass, or
PostCSS that supports selector nesting.

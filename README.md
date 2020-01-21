# hacss
Hackable inline style language embedded in HTML classes

## Overview

While many consider inline styles to be, in essence, more maintainable than
external stylesheets, the limited capabilities of vanilla inline styles (e. g.
no media queries or pseudo-selectors) often force a project to use external
stylesheets or to resort to JavaScript for even trivial state changes (e. g.
changing the color of a button on hover) or responsive designs.

Hacss, inspired by [acss.io](https://acss.io), captures the maintainability
benefits of inline styles as well as the capabilities of external stylesheets by
embedding its own styling DSL within HTML `class` attributes. At build time,
Hacss automatically generates a stylesheet from the CSS classes used throughout
the project: `<h1 class="C(red)">Hello World</h1>`, for example, yields a CSS
block `.C\(red\) { color: red; }`.

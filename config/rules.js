const { color, normalizeLength, lookup, mapArgs } = require("./utils.js");

const borderStyles = {
  d: "dotted",
  da: "dashed",
  do: "double",
  g: "groove",
  h: "hidden",
  i: "inset",
  n: "none",
  o: "outset",
  r: "ridge",
  s: "solid",
};

const borderWidths = { m: "medium", t: "thin", th: "thick" };

const overflow = {
  a: "auto",
  h: "hidden",
  s: "scroll",
  v: "visible",
};

const transformOrPerspectiveOrigins = {
  t: "top",
  end: "__END__",
  bottom: "bottom",
  start: "__START__",
  c: "center",
};

module.exports = {
  Ac: mapArgs(
    a => `align-content: ${a}`,
    lookup({
      fs: "flex-start",
      fe: "flex-end",
      c: "center",
      sb: "space-between",
      sa: "space-around",
      st: "stretch",
    }),
  ),
  Ai: mapArgs(
    a => `align-items: ${a}`,
    lookup({
      fs: "flex-start",
      fe: "flex-end",
      c: "center",
      b: "baseline",
      st: "stretch",
    }),
  ),
  Animdel: a => `animation-delay: ${a}`,
  Animdir: mapArgs(
    a => `animation-direction: ${a}`,
    lookup({
      a: "alternate",
      ar: "alternate-reverse",
      n: "normal",
      r: "reverse",
    }),
  ),
  Animdur: a => `animation-duration: ${a}`,
  Animfm: mapArgs(
    a => `animation-fill-mode: ${a}`,
    lookup({ b: "backwards", bo: "both", f: "forwards", n: "none" }),
  ),
  Animic: mapArgs(
    a => `animation-iteration-count: ${a}`,
    lookup({ i: "infinite" }),
  ),
  Animn: mapArgs(a => `animation-name: ${a}`, lookup({ n: "none" })),
  Animps: mapArgs(
    a => `animation-play-state: ${a}`,
    lookup({ p: "paused", r: "running" }),
  ),
  Animtf: mapArgs(
    a => `animation-timing-function: ${a}`,
    lookup({
      e: "ease",
      ei: "ease-in",
      eo: "ease-out",
      eio: "ease-in-out",
      l: "linear",
      se: "step-end",
      ss: "step-start",
    }),
  ),
  Ap: mapArgs(a => `appearance: ${a}`, lookup({ a: "auto", n: "none" })),
  As: mapArgs(
    a => `align-self: ${a}`,
    lookup({
      a: "auto",
      fs: "flex-start",
      fe: "flex-end",
      c: "center",
      b: "baseline",
      st: "stretch",
    }),
  ),
  B: mapArgs(a => `bottom: ${a}`, [normalizeLength, lookup({ a: "auto" })]),
  Bd: [
    "border-width: 1px; border-style: solid",
    mapArgs(a => `border: ${a}`, lookup({ 0: 0, n: "none" })),
  ],
  BdB: `
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-style: solid;
  `,
  BdEnd: `
    border-top-width: 0;
    border-__END__-width: 1px;
    border-bottom-width: 0;
    border-__START__-width: 0;
    border-style: solid;
  `,
  BdStart: `
    border-top-width: 0;
    border-__END__-width: 0;
    border-bottom-width: 0;
    border-__START__-width: 1px;
    border-style: solid;
  `,
  BdT: `
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 0;
    border-style: solid;
  `,
  BdX: `
    border-top-width: 0;
    border-right-width: 1px;
    border-bottom-width: 0;
    border-left-width: 1px;
    border-style: solid;
  `,
  BdY: `
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-style: solid;
  `,
  Bdb: a => `border-bottom: ${a}`,
  Bdbc: mapArgs(a => `border-bottom-color: ${a}`, color),
  Bdbs: mapArgs(a => `border-bottom-style: ${a}`, lookup(borderStyles)),
  Bdbw: mapArgs(a => `border-bottom-width: ${a}`, lookup(borderWidths)),
  Bdc: mapArgs(a => `border-color: ${a}`, color),
  Bdcl: mapArgs(
    a => `border-collapse: ${a}`,
    lookup({ c: "collapse", s: "separate" }),
  ),
  Bdend: a => `border-__END__: ${a}`,
  Bdendc: mapArgs(a => `border-__END__-color: ${a}`, color),
  Bdends: mapArgs(a => `border-__END__-style: ${a}`, lookup(borderStyles)),
  Bdendw: mapArgs(a => `border-__END__-width: ${a}`, lookup(borderWidths)),
  Bdrs: a => `border-radius: ${a}`,
  Bdrsbend: a => `border-bottom-__END__-radius: ${a}`,
  Bdrsbstart: a => `border-bottom-__START__-radius: ${a}`,
  Bdrstend: a => `border-top-__END__-radius: ${a}`,
  Bdrststart: a => `border-top-__START__-radius: ${a}`,
  Bds: mapArgs(a => `border-style: ${a}`, lookup(borderStyles)),
  Bdsp: mapArgs(
    (a, b = "") => `border-spacing: ${a} ${b}`,
    lookup({ i: "inherit" }),
    lookup({ i: "inherit" }),
  ),
  Bdstart: a => `border-__START__: ${a}`,
  Bdstartc: mapArgs(a => `border-__START__-color: ${a}`, color),
  Bdstarts: mapArgs(a => `border-__START__-style: ${a}`, lookup(borderStyles)),
  Bdstartw: mapArgs(a => `border-__START__-width: ${a}`, lookup(borderWidths)),
  Bdt: a => `border-top: ${a}`,
  Bdtc: mapArgs(a => `border-top-color: ${a}`, color),
  Bdts: mapArgs(a => `border-top-style: ${a}`, lookup(borderStyles)),
  Bdtw: mapArgs(a => `border-top-width: ${a}`, lookup(borderWidths)),
  Bdw: mapArgs(a => `border-width: ${a}`, lookup(borderWidths)),
  Bdx: a => `border-__START__: ${a}; border-__END__: ${a}`,
  Bdy: a => `border-top: ${a}; border-bottom: ${a}`,
  BfcHack: `
    display: table-cell;
    width: 1600px;
    *width: auto;
    zoom: 1;
  `,
  Bfv: mapArgs(
    a => `backface-visibility: ${a}`,
    lookup({ h: "hidden", v: "visible" }),
  ),
  Bg: mapArgs(a => `background: ${a}`, lookup({ n: "none", t: "transparent" })),
  Bga: mapArgs(
    a => `background-attachment: ${a}`,
    lookup({ f: "fixed", l: "local", s: "scroll" }),
  ),
  Bgc: mapArgs(a => `background-color: ${a}`, color),
  Bgcp: mapArgs(
    a => `background-clip: ${a}`,
    lookup({ bb: "border-box", cb: "content-box", pb: "padding-box" }),
  ),
  Bgi: mapArgs(a => `background-image: ${a}`, lookup({ n: "none" })),
  Bgo: mapArgs(
    a => `background-origin: ${a}`,
    lookup({ bb: "border-box", cb: "content-box", pb: "padding-box" }),
  ),
  Bgp: mapArgs(
    (a, b = "") => `background-position: ${a} ${b}`,
    lookup({
      start_t: "__START__ 0",
      end_t: "__END__ 0",
      start_b: "__START__ 100%",
      end_b: "__END__ 100%",
      start_c: "__START__ center",
      end_c: "__END__ center",
      c_b: "center 100%",
      c_t: "center 0",
      c: "center",
    }),
  ),
  Bgpx: mapArgs(
    a => `background-position-x: ${a}`,
    lookup({ start: "__START__", end: "__END__", c: "50%" }),
  ),
  Bgpy: mapArgs(
    a => `background-position-y: ${a}`,
    lookup({ t: "0", b: "100%", c: "50%" }),
  ),
  Bgr: mapArgs(
    a => `background-repeat: ${a}`,
    lookup({
      nr: "no-repeat",
      rx: "repeat-x",
      ry: "repeat-y",
      r: "repeat",
      s: "space",
      ro: "round",
    }),
  ),
  Bgz: mapArgs(
    a => `background-size: ${a}`,
    lookup({ a: "auto", ct: "contain", cv: "cover" }),
  ),
  Blur: a => `filter: blur(${a})`,
  Brightness: a => `filter: brightness(${a})`,
  Bxsh: mapArgs(a => `box-shadow: ${a}`, lookup({ n: "none" })),
  Bxz: mapArgs(
    a => `box-sizing: ${a}`,
    lookup({ cb: "content-box", pb: "padding-box", bb: "border-box" }),
  ),
  Cf: `
    zoom: 1;
    &::before, &::after {
      content: " ";
      display: table;
    }
    &::after: {
      clear: both;
    }
  `,
  Cl: mapArgs(
    a => `clear: ${a}`,
    lookup({ n: "none", b: "both", start: "__START__", end: "__END__" }),
  ),
  C: mapArgs(a => `color: ${a}`, color),
  Cnt: mapArgs(
    a => `content: ${a}`,
    lookup({
      n: "none",
      nor: "normal",
      oq: "open-quote",
      cq: "close-quote",
      noq: "no-open-quote",
      ncq: "no-close-quote",
    }),
  ),
  Contrast: a => `filter: contrast(${a})`,
  Ctn: mapArgs(
    a => `contain: ${a}`,
    lookup({
      n: "none",
      st: "strict",
      c: "content",
      z: "size",
      l: "layout",
      s: "style",
      p: "paint",
    }),
  ),
  Cur: mapArgs(
    a => `cursor: ${a}`,
    lookup({
      a: "auto",
      as: "all-scroll",
      c: "cell",
      cr: "col-resize",
      co: "copy",
      cro: "crosshair",
      d: "default",
      er: "e-resize",
      ewr: "ew-resize",
      g: "grab",
      gr: "grabbing",
      h: "help",
      m: "move",
      n: "none",
      nd: "no-drop",
      na: "not-allowed",
      nr: "n-resize",
      ner: "ne-resize",
      neswr: "nesw-resize",
      nwser: "nwse-resize",
      nsr: "ns-resize",
      nwr: "nw-resize",
      p: "pointer",
      pr: "progress",
      rr: "row-resize",
      sr: "s-resize",
      ser: "se-resize",
      swr: "sw-resize",
      t: "text",
      vt: "vertical-text",
      w: "wait",
      wr: "w-resize",
      zi: "zoom-in",
      zo: "zoom-out",
    }),
  ),
  D: mapArgs(
    a => `display: ${a}`,
    lookup({
      n: "none",
      b: "block",
      f: "flex",
      if: "inline-flex",
      i: "inline",
      ib: "inline-block",
      tb: "table",
      tbr: "table-row",
      tbc: "table-cell",
      li: "list-item",
      ri: "run-in",
      cp: "compact",
      itb: "inline-table",
      tbcl: "table-column",
      tbclg: "table-column-group",
      tbhg: "table-header-group",
      tbfg: "table-footer-group",
      tbrg: "table-row-group",
    }),
  ),
  Ell: `
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    hyphens: none;
    &::after {
      content: ".";
      font-size: 0;
      visibility: hidden;
      display: inline-block;
      overflow: hidden;
      height: 0;
      width: 0;
    }
  `,
  End: mapArgs(a => `__END__: ${a}`, [normalizeLength, lookup({ a: "auto" })]),
  Ff: mapArgs(
    a => `font-family: ${a}`,
    lookup({
      c: '"Monotype Corsiva", "Comic Sans MS", cursive',
      f: "Capitals, Impact, fantasy",
      m: 'Monaco, "Courier New", monospace',
      s: 'Georgia, "Times New Roman", serif',
      ss: "Helvetica, Arial, sans-serif",
    }),
  ),
  Fil: mapArgs(a => `filter: ${a}`, lookup({ n: "none" })),
  Fill: mapArgs(a => `fill: ${a}`, color),
  Fl: mapArgs(
    a => `float: ${a}`,
    lookup({ n: "none", start: "__START__", end: "__END__" }),
  ),
  Fs: mapArgs(
    a => `font-style: ${a}`,
    lookup({ n: "normal", i: "italic", o: "oblique" }),
  ),
  Fv: mapArgs(
    a => `font-variant: ${a}`,
    lookup({ n: "normal", sc: "small-caps" }),
  ),
  H: mapArgs(a => `height: ${a}`, [
    normalizeLength,
    lookup({
      0: "0",
      a: "auto",
      av: "available",
      bb: "border-box",
      cb: "content-box",
      fc: "fit-content",
      maxc: "max-content",
      minc: "min-content",
    }),
  ]),
  Fw: mapArgs(
    a => `font-weight: ${a}`,
    lookup({
      100: "100",
      200: "200",
      300: "300",
      400: "400",
      500: "500",
      600: "600",
      700: "700",
      800: "800",
      900: "900",
      b: "bold",
      br: "bolder",
      lr: "lighter",
      n: "normal",
    }),
  ),
  Fx: mapArgs(a => `flex: ${a}`, [
    normalizeLength,
    lookup({ a: "auto", n: "none" }),
  ]),
  Fxb: mapArgs(a => `flex-basis: ${a}`, [
    normalizeLength,
    lookup({ a: "auto", n: "none" }),
  ]),
  Fxd: mapArgs(
    a => `flex-direction: ${a}`,
    lookup({ r: "row", rr: "row-reverse", c: "column", cr: "column-reverse" }),
  ),
  Fxf: mapArgs(
    a => `flex-flow: ${a}`,
    lookup({
      r: "row",
      rr: "row-reverse",
      c: "column",
      cr: "column-reverse",
      nw: "nowrap",
      w: "wrap",
      wr: "wrap-reverse",
    }),
  ),
  Fxg: a => `flex-grow: ${a}`,
  Fxs: a => `flex-shrink: ${a}`,
  Fxw: mapArgs(
    a => `flex-wrap: ${a}`,
    lookup({ nw: "nowrap", w: "wrap", wr: "wrap-reverse" }),
  ),
  Fz: a => `font-size: ${a}`,
  Grayscale: a => `filter: grayscale(${a})`,
  Hidden: `
    position: absolute !important;
    *clip: rect(1px 1px 1px 1px);
    clip: rect(1px,1px,1px,1px);
    padding: 0 !important;
    border: 0 !important;
    height: 1px !important;
    width: 1px !important;
    overflow: hidden;
  `,
  HueRotate: a => `filter: hue-rotate(${a})`,
  Hy: mapArgs(
    a => `hyphens: ${a}`,
    lookup({ a: "auto", n: "normal", m: "manual" }),
  ),
  IbBox: `
    display: inline-block;
    *display: inline;
    zoom: 1;
    vertical-align: top;
  `,
  Invert: a => `filter: invert(${a})`,
  Jc: mapArgs(
    a => `justify-content: ${a}`,
    lookup({
      fs: "flex-start",
      fe: "flex-end",
      c: "center",
      sb: "space-between",
      sa: "space-around",
      se: "space-evenly",
      s: "stretch",
    }),
  ),
  Lh: mapArgs(a => `line-height: ${a}`, lookup({ n: "normal" })),
  M: mapArgs(a => `margin: ${a}`, lookup({ 0: "0", a: "auto" })),
  LineClamp: (a, b) => `
    -webkit-line-clamp: ${a};
    -webkit-box-orient: vertical;
    max-height: ${b};
    display: -webkit-box;
    overflow: hidden;
    @supports (display:-moz-box): {
      display: block;
    }
    &:not(:not(a)) {
      display: inline-block;
      display : -webkit-box;
      *display: inline;
      zoom: 1;
      &::after {
        content: ".";
        font-size: 0;
        visibility: hidden;
        display: inline-block;
        overflow: hidden;
        height: 0;
        width: 0;
      }
    }
  `,
  Lisi: mapArgs(a => `list-style-image: ${a}`, lookup({ n: "none" })),
  Lisp: mapArgs(
    a => `list-style-position: ${a}`,
    lookup({ i: "inside", o: "outside" }),
  ),
  List: mapArgs(
    a => `list-style-type: ${a}`,
    lookup({
      n: "none",
      d: "disc",
      c: "circle",
      s: "square",
      dc: "decimal",
      dclz: "decimal-leading-zero",
      lr: "lower-roman",
      lg: "lower-greek",
      ll: "lower-latin",
      ur: "upper-roman",
      ul: "upper-latin",
      a: "armenian",
      g: "georgian",
      la: "lower-alpha",
      ua: "upper-alpha",
    }),
  ),
  Lts: mapArgs(a => `letter-spacing: ${a}`, lookup({ n: "normal" })),
  Mah: mapArgs(
    a => `max-height: ${a}`,
    lookup({
      a: "auto",
      maxc: "max-content",
      minc: "min-content",
      fa: "fill-available",
      fc: "fit-content",
    }),
  ),
  Matrix: a => `transform: matrix(${a})`,
  Matrix3d: a => `transform: matrix(${a})`,
  Maw: mapArgs(
    a => `max-width: ${a}`,
    lookup({
      n: "none",
      fa: "fill-available",
      fc: "fit-content",
      maxc: "max-content",
      minc: "min-content",
    }),
  ),
  Mb: mapArgs(a => `margin-bottom: ${a}`, lookup({ 0: "0", a: "auto" })),
  Mend: mapArgs(a => `margin-__END__: ${a}`, lookup({ 0: "0", a: "auto" })),
  Mih: mapArgs(a => `min-height: ${a}`, [
    normalizeLength,
    lookup({
      a: "auto",
      fa: "fill-available",
      fc: "fit-content",
      maxc: "max-content",
      minc: "min-content",
    }),
  ]),
  Miw: mapArgs(a => `min-width: ${a}`, [
    normalizeLength,
    lookup({
      a: "auto",
      fa: "fill-available",
      fc: "fit-content",
      ini: "initial",
      maxc: "max-content",
      minc: "min-content",
    }),
  ]),
  Mstart: mapArgs(a => `margin-__START__: ${a}`, lookup({ 0: "0", a: "auto" })),
  Mt: mapArgs(a => `margin-top: ${a}`, lookup({ 0: "0", a: "auto" })),
  Mx: mapArgs(
    a => `margin-__START__: ${a}; margin-__END__: ${a}`,
    lookup({ 0: "0", a: "auto" }),
  ),
  My: mapArgs(
    a => `margin-top: ${a}; margin-bottom: ${a}`,
    lookup({ 0: "0", a: "auto" }),
  ),
  Objf: mapArgs(
    a => `object-fit: ${a}`,
    lookup({
      ct: "contain",
      cv: "cover",
      f: "fill",
      n: "none",
      sd: "scale-down",
    }),
  ),
  O: mapArgs(a => `outline: ${a}`, lookup({ 0: "0", n: "none" })),
  Op: mapArgs(a => `opacity: ${a}`, lookup({ 0: "0", 1: "1" })),
  Opacity: a => `filter: opacity(${a})`,
  Or: a => `order: ${a}`,
  Ov: mapArgs(a => `overflow: ${a}`, lookup(overflow)),
  Ovs: mapArgs(
    a => `-webkit-overflow-scrolling: ${a}`,
    lookup({ a: "auto", touch: "touch" }),
  ),
  P: a => `padding: ${a}`,
  Ovx: mapArgs(a => `overflow-x: ${a}`, lookup(overflow)),
  Ovy: mapArgs(a => `overflow-y: ${a}`, lookup(overflow)),
  Pb: a => `padding-bottom: ${a}`,
  Pe: mapArgs(
    a => `pointer-events: ${a}`,
    lookup({
      a: "auto",
      all: "all",
      f: "fill",
      n: "none",
      p: "painted",
      s: "stroke",
      v: "visible",
      vf: "visibleFill",
      vp: "visiblePainted",
      vs: "visibleStroke",
    }),
  ),
  Pend: a => `padding-__END__: ${a}`,
  Pos: mapArgs(
    a => `position: ${a}`,
    lookup({
      a: "absolute",
      f: "fixed",
      r: "relative",
      s: "static",
      st: "sticky",
    }),
  ),
  Prs: mapArgs(a => `perspective: ${a}`, lookup({ n: "none" })),
  Prso: mapArgs(
    (a, b) => `perspective-origin: ${a} ${b}`,
    lookup(transformOrPerspectiveOrigins),
    lookup(transformOrPerspectiveOrigins),
  ),
  Pstart: a => `padding-__START__: ${a}`,
  Pt: a => `padding-top: ${a}`,
  Px: a => `padding-__START__: ${a}; padding-__END__: ${a}`,
  Py: a => `padding-top: ${a}; padding-bottom: ${a}`,
  Rotate: a => `transform: rotate(${a})`,
  Rotate3d: (a, b, c, d) => `transform: rotate3d(${a},${b},${c},${d})`,
  RotateX: a => `transform: rotateX(${a})`,
  RotateY: a => `transform: rotateY(${a})`,
  RotateZ: a => `transform: rotateZ(${a})`,
  Row: `
    clear: both;
    display: inline-block;
    vertical-align: top;
    width: 100%;
    box-sizing: border-box;
    *display: block;
    *width: auto;
    zoom: 1;
  `,
  Rsz: mapArgs(
    a => `resize: ${a}`,
    lookup({ n: "none", b: "both", h: "horizontal", v: "vertical" }),
  ),
  Saturate: a => `filter: saturate(${a})`,
  Scale: (a, b) => `transform: scale(${a},${b})`,
  Scale3d: (a, b, c) => `transform: scale3d(${a},${b},${c})`,
  ScaleX: a => `transform: scaleX(${a})`,
  ScaleY: a => `transform: scaleY(${a})`,
  Sepia: a => `filter: sepia(${a})`,
  Skew: (a, b) => `transform: skew(${a},${b})`,
  SkewX: a => `transform: skewX(${a})`,
  SkewY: a => `transform: skewY(${a})`,
  Start: mapArgs(a => `__START__: ${a}`, [
    normalizeLength,
    lookup({ a: "auto" }),
  ]),
  Stk: mapArgs(a => `stroke: ${a}`, color),
  Stklc: mapArgs(
    a => `stroke-linecap: ${a}`,
    lookup({ i: "inherit", b: "butt", r: "round", s: "square" }),
  ),
  Stklj: mapArgs(
    a => `stroke-linejoin: ${a}`,
    lookup({ i: "inherit", b: "bevel", r: "round", m: "miter" }),
  ),
  Stkw: mapArgs(a => `stroke-width: ${a}`, lookup({ i: "inherit" })),
  StretchedBox: `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
  T: mapArgs(a => `top: ${a}`, [normalizeLength, lookup({ a: "auto" })]),
  Ta: mapArgs(
    a => `text-align: ${a}`,
    lookup({
      c: "center",
      e: "end",
      end: "__END__",
      j: "justify",
      mp: "match-parent",
      s: "start",
      start: "__START__",
    }),
  ),
  Tal: mapArgs(
    a => `text-align-last: ${a}`,
    lookup({
      a: "auto",
      c: "center",
      e: "end",
      end: "__END__",
      j: "justify",
      s: "start",
      start: "__START__",
    }),
  ),
  Tbl: mapArgs(a => `table-layout: ${a}`, lookup({ a: "auto", f: "fixed" })),
  Td: mapArgs(
    a => `text-decoration: ${a}`,
    lookup({ lt: "line-through", n: "none", o: "overline", u: "underline" }),
  ),
  Ti: a => `text-indent: ${a}`,
  Tov: mapArgs(
    a => `text-overflow: ${a}`,
    lookup({ c: "clip", e: "ellipsis" }),
  ),
  Tr: mapArgs(a => `text-replace: ${a}`, lookup({ n: "none" })),
  Translate: (a, b) => `transform: translate(${a},${b})`,
  Translate3d: (a, b, c) => `transform: translate3d(${a},${b},${c})`,
  TranslateX: a => `transform: translateX(${a})`,
  TranslateY: a => `transform: translateY(${a})`,
  TranslateZ: a => `transform: translateZ(${a})`,
  Tren: mapArgs(
    a => `text-rendering: ${a}`,
    lookup({
      a: "auto",
      os: "optimizeSpeed",
      ol: "optimizeLegibility",
      gp: "geometricPrecision",
    }),
  ),
  Trfo: mapArgs(
    (a, b) => `transform-origin: ${a} ${b}`,
    lookup(transformOrPerspectiveOrigins),
    lookup(transformOrPerspectiveOrigins),
  ),
  Trfs: mapArgs(
    a => `transform-style: ${a}`,
    lookup({ f: "flat", p: "preserve-3d" }),
  ),
  Trsde: mapArgs(a => `transition-delay: ${a}`, lookup({ i: "initial" })),
  Trsdu: a => `transition-duration: ${a}`,
  Trsp: mapArgs(a => `transition-property: ${a}`, lookup({ a: "all" })),
  Trstf: mapArgs(
    a => `transition-timing-function: ${a}`,
    lookup({
      e: "ease",
      ei: "ease-in",
      eo: "ease-out",
      eio: "ease-in-out",
      l: "linear",
      ss: "step-start",
      se: "step-end",
    }),
  ),
  Tsh: mapArgs(a => `text-shadow: ${a}`, lookup({ n: "none" })),
  Tt: mapArgs(
    a => `text-transform: ${a}`,
    lookup({ n: "none", c: "capitalize", u: "uppercase", l: "lowercase" }),
  ),
  Us: mapArgs(
    a => `user-select: ${a}`,
    lookup({
      a: "all",
      el: "element",
      els: "elements",
      n: "none",
      t: "text",
      to: "toggle",
    }),
  ),
  Va: mapArgs(
    a => `vertical-align: ${a}`,
    lookup({
      b: "bottom",
      bl: "baseline",
      m: "middle",
      sub: "sub",
      sup: "super",
      t: "top",
      tb: "text-bottom",
      tt: "text-top",
    }),
  ),
  V: mapArgs(
    a => `visibility: ${a}`,
    lookup({ v: "visible", h: "hidden", c: "collapse" }),
  ),
  W: mapArgs(a => `width: ${a}`, [
    normalizeLength,
    lookup({
      0: "0",
      a: "auto",
      bb: "border-box",
      cb: "content-box",
      av: "available",
      minc: "min-content",
      maxc: "max-content",
      fc: "fit-content",
    }),
  ]),
  Whs: mapArgs(
    a => `white-space: ${a}`,
    lookup({
      n: "normal",
      p: "pre",
      nw: "nowrap",
      pw: "pre-wrap",
      pl: "pre-line",
    }),
  ),
  Whsc: mapArgs(
    a => `white-space-collapse: ${a}`,
    lookup({
      n: "normal",
      ka: "keep-all",
      l: "loose",
      bs: "break-strict",
      ba: "break-all",
    }),
  ),
  Wob: mapArgs(
    a => `word-break: ${a}`,
    lookup({ ba: "break-all", ka: "keep-all", n: "normal" }),
  ),
  Wow: mapArgs(
    a => `word-wrap: ${a}`,
    lookup({ bw: "break-word", n: "normal" }),
  ),
  Z: mapArgs(a => `z-index: ${a}`, lookup({ a: "auto" })),
  Zoom: `zoom: 1`,
};

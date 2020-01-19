const {
  borderStyles,
  borderWidths,
  overflow,
  transformOrPerspectiveOrigins,
} = require("./common-maps.js");
const { color, lookup, mapArgs } = require("./utils.js");

module.exports = {
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
  Bd: [
    "border-width: 1px; border-style: solid",
    mapArgs(a => `border: ${a}`, lookup({ 0: 0, n: "none" })),
  ],
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
  BdT: `
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 0;
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
  BdB: `
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-style: solid;
  `,
  BdStart: `
    border-top-width: 0;
    border-__END__-width: 0;
    border-bottom-width: 0;
    border-__START__-width: 1px;
    border-style: solid;
  `,
  Bdx: a => `border-__START__: ${a}; border-__END__: ${a}`,
  Bdy: a => `border-top: ${a}; border-bottom: ${a}`,
  Bdt: a => `border-top: ${a}`,
  Bdend: a => `border-__END__: ${a}`,
  Bdb: a => `border-bottom: ${a}`,
  Bdstart: a => `border-__START__: ${a}`,
  Bdc: mapArgs(a => `border-color: ${a}`, color),
  Bdtc: mapArgs(a => `border-top-color: ${a}`, color),
  Bdendc: mapArgs(a => `border-__END__-color: ${a}`, color),
  Bdbc: mapArgs(a => `border-bottom-color: ${a}`, color),
  Bdstartc: mapArgs(a => `border-__START__-color: ${a}`, color),
  Bdsp: mapArgs(
    (a, b) => `border-spacing: ${a} ${b}`,
    lookup({ i: "inherit" }),
  ),
  Bds: mapArgs(a => `border-style: ${a}`, lookup(borderStyles)),
  Bdts: mapArgs(a => `border-top-style: ${a}`, lookup(borderStyles)),
  Bdends: mapArgs(a => `border-__END__-style: ${a}`, lookup(borderStyles)),
  Bdbs: mapArgs(a => `border-bottom-style: ${a}`, lookup(borderStyles)),
  Bdstarts: mapArgs(a => `border-__START__-style: ${a}`, lookup(borderStyles)),
  Bdw: mapArgs(a => `border-width: ${a}`, lookup(borderWidths)),
  Bdtw: mapArgs(a => `border-top-width: ${a}`, lookup(borderWidths)),
  Bdendw: mapArgs(a => `border-__END__-width: ${a}`, lookup(borderWidths)),
  Bdbw: mapArgs(a => `border-bottom-width: ${a}`, lookup(borderWidths)),
  Bdstartw: mapArgs(a => `border-__START__-width: ${a}`, lookup(borderWidths)),
  Bdrs: a => `border-radius: ${a}`,
  Bdrstend: a => `border-top-__END__-radius: ${a}`,
  Bdrsbend: a => `border-bottom-__END__-radius: ${a}`,
  Bdrsbstart: a => `border-bottom-__START__-radius: ${a}`,
  Bdrststart: a => `border-top-__START__-radius: ${a}`,
  Bg: mapArgs(a => `background: ${a}`, lookup({ n: "none", t: "transparent" })),
  Bgi: mapArgs(a => `background-image: ${a}`, lookup({ n: "none" })),
  Bgc: mapArgs(a => `background-color: ${a}`, color),
  Bgcp: mapArgs(
    a => `background-clip: ${a}`,
    lookup({ bb: "border-box", cb: "content-box", pb: "padding-box" }),
  ),
  Bgo: mapArgs(
    a => `background-origin: ${a}`,
    lookup({ bb: "border-box", cb: "content-box", pb: "padding-box" }),
  ),
  Bgz: mapArgs(
    a => `background-size: ${a}`,
    lookup({ a: "auto", ct: "contain", cv: "cover" }),
  ),
  Bga: mapArgs(
    a => `background-attachment: ${a}`,
    lookup({ f: "fixed", l: "local", s: "scroll" }),
  ),
  Bgp: mapArgs(
    (a, b) => `background-position: ${a} ${b}`,
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
  Bdcl: mapArgs(
    a => `border-collapse: ${a}`,
    lookup({ c: "collapse", s: "separate" }),
  ),
  Bxz: mapArgs(
    a => `box-sizing: ${a}`,
    lookup({ cb: "content-box", pb: "padding-box", bb: "border-box" }),
  ),
  Bxsh: mapArgs(a => `box-shadow: ${a}`, lookup({ n: "none" })),
  Cl: mapArgs(
    a => `clear: ${a}`,
    lookup({ n: "none", b: "both", start: "__START__", end: "__END__" }),
  ),
  C: mapArgs(a => `color: ${a}`, color),
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
  Fil: mapArgs(a => `filter: ${a}`, lookup({ n: "none" })),
  Blur: a => `filter: blur(${a})`,
  Brightness: a => `filter: brightness(${a})`,
  Contrast: a => `filter: contrast(${a})`,
  Grayscale: a => `filter: grayscale(${a})`,
  HueRotate: a => `filter: hue-rotate(${a})`,
  Invert: a => `filter: invert(${a})`,
  Opacity: a => `filter: opacity(${a})`,
  Saturate: a => `filter: saturate(${a})`,
  Sepia: a => `filter: sepia(${a})`,
  Fx: mapArgs(a => `flex: ${a}`, lookup({ a: "auto", n: "none" })),
  Fxg: a => `flex-grow: ${a}`,
  Fxs: a => `flex-shrink: ${a}`,
  Fxb: mapArgs(a => `flex-basis: ${a}`, lookup({ a: "auto", n: "none" })),
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
  Or: a => `order: ${a}`,
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
  Fxw: mapArgs(
    a => `flex-wrap: ${a}`,
    lookup({ nw: "nowrap", w: "wrap", wr: "wrap-reverse" }),
  ),
  Fl: mapArgs(
    a => `float: ${a}`,
    lookup({ n: "none", start: "__START__", end: "__END__" }),
  ),
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
  Fz: a => `font-size: ${a}`,
  Fs: mapArgs(
    a => `font-style: ${a}`,
    lookup({ n: "normal", i: "italic", o: "oblique" }),
  ),
  Fv: mapArgs(
    a => `font-variant: ${a}`,
    lookup({ n: "normal", sc: "small-caps" }),
  ),
  H: mapArgs(
    a => `height: ${a}`,
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
  ),
  Hy: mapArgs(
    a => `hyphens: ${a}`,
    lookup({ a: "auto", n: "normal", m: "manual" }),
  ),
  Lts: mapArgs(a => `letter-spacing: ${a}`, lookup({ n: "normal" })),
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
  Lisp: mapArgs(
    a => `list-style-position: ${a}`,
    lookup({ i: "inside", o: "outside" }),
  ),
  Lisi: mapArgs(a => `list-style-image: ${a}`, lookup({ n: "none" })),
  Lh: mapArgs(a => `line-height: ${a}`, lookup({ n: "normal" })),
  M: mapArgs(a => `margin: ${a}`, lookup({ 0: "0", a: "auto" })),
  Mx: mapArgs(
    a => `margin-__START__: ${a}; margin-__END__: ${a}`,
    lookup({ 0: "0", a: "auto" }),
  ),
  My: mapArgs(
    a => `margin-top: ${a}; margin-bottom: ${a}`,
    lookup({ 0: "0", a: "auto" }),
  ),
  Mt: mapArgs(a => `margin-top: ${a}`, lookup({ 0: "0", a: "auto" })),
  Mend: mapArgs(a => `margin-__END__: ${a}`, lookup({ 0: "0", a: "auto" })),
  Mb: mapArgs(a => `margin-bottom: ${a}`, lookup({ 0: "0", a: "auto" })),
  Mstart: mapArgs(a => `margin-__START__: ${a}`, lookup({ 0: "0", a: "auto" })),
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
  Mih: mapArgs(
    a => `min-height: ${a}`,
    lookup({
      a: "auto",
      fa: "fill-available",
      fc: "fit-content",
      maxc: "max-content",
      minc: "min-content",
    }),
  ),
  Miw: mapArgs(
    a => `min-width: ${a}`,
    lookup({
      a: "auto",
      fa: "fill-available",
      fc: "fit-content",
      ini: "initial",
      maxc: "max-content",
      minc: "min-content",
    }),
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
  T: mapArgs(a => `top: ${a}`, lookup({ a: "auto" })),
  End: mapArgs(a => `__END__: ${a}`, lookup({ a: "auto" })),
  B: mapArgs(a => `bottom: ${a}`, lookup({ a: "auto" })),
  Start: mapArgs(a => `__START__: ${a}`, lookup({ a: "auto" })),
  Op: mapArgs(a => `opacity: ${a}`, lookup({ 0: "0", 1: "1" })),
  Ov: mapArgs(a => `overflow: ${a}`, lookup(overflow)),
  Ovx: mapArgs(a => `overflow-x: ${a}`, lookup(overflow)),
  Ovy: mapArgs(a => `overflow-y: ${a}`, lookup(overflow)),
  Ovs: mapArgs(
    a => `-webkit-overflow-scrolling: ${a}`,
    lookup({ a: "auto", touch: "touch" }),
  ),
  P: a => `padding: ${a}`,
  Px: a => `padding-__START__: ${a}; padding-__END__: ${a}`,
  Py: a => `padding-top: ${a}; padding-bottom: ${a}`,
  Pt: a => `padding-top: ${a}`,
  Pend: a => `padding-__END__: ${a}`,
  Pb: a => `padding-bottom: ${a}`,
  Pstart: a => `padding-__START__: ${a}`,
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
  Rsz: mapArgs(
    a => `resize: ${a}`,
    lookup({ n: "none", b: "both", h: "horizontal", v: "vertical" }),
  ),
  Tbl: mapArgs(a => `table-layout: ${a}`, lookup({ a: "auto", f: "fixed" })),
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
  Td: mapArgs(
    a => `text-decoration: ${a}`,
    lookup({ lt: "line-through", n: "none", o: "overline", u: "underline" }),
  ),
  Ti: a => `text-indent: ${a}`,
  Tov: mapArgs(
    a => `text-overflow: ${a}`,
    lookup({ c: "clip", e: "ellipsis" }),
  ),
  Tren: mapArgs(
    a => `text-rendering: ${a}`,
    lookup({
      a: "auto",
      os: "optimizeSpeed",
      ol: "optimizeLegibility",
      gp: "geometricPrecision",
    }),
  ),
  Tr: mapArgs(a => `text-replace: ${a}`, lookup({ n: "none" })),
  Tt: mapArgs(
    a => `text-transform: ${a}`,
    lookup({ n: "none", c: "capitalize", u: "uppercase", l: "lowercase" }),
  ),
  Tsh: mapArgs(a => `text-shadow: ${a}`, lookup({ n: "none" })),
  Trfo: mapArgs(
    (a, b) => `transform-origin: ${a} ${b}`,
    lookup(transformOrPerspectiveOrigins),
    lookup(transformOrPerspectiveOrigins),
  ),
  Trfs: mapArgs(
    a => `transform-style: ${a}`,
    lookup({ f: "flat", p: "preserve-3d" }),
  ),
  Prs: mapArgs(a => `perspective: ${a}`, lookup({ n: "none" })),
  Prso: mapArgs(
    (a, b) => `perspective-origin: ${a} ${b}`,
    lookup(transformOrPerspectiveOrigins),
    lookup(transformOrPerspectiveOrigins),
  ),
  Bfv: mapArgs(
    a => `backface-visibility: ${a}`,
    lookup({ h: "hidden", v: "visible" }),
  ),
  Matrix: a => `transform: matrix(${a})`,
  Matrix3d: a => `transform: matrix(${a})`,
  Rotate: a => `transform: rotate(${a})`,
  Rotate3d: (a, b, c, d) => `transform: rotate3d(${a},${b},${c},${d})`,
  RotateX: a => `transform: rotateX(${a})`,
  RotateY: a => `transform: rotateY(${a})`,
  RotateZ: a => `transform: rotateZ(${a})`,
  Scale: (a, b) => `transform: scale(${a},${b})`,
  Scale3d: (a, b, c) => `transform: scale3d(${a},${b},${c})`,
  ScaleX: a => `transform: scaleX(${a})`,
  ScaleY: a => `transform: scaleY(${a})`,
  Skew: (a, b) => `transform: skew(${a},${b})`,
  SkewX: a => `transform: skewX(${a})`,
  SkewY: a => `transform: skewY(${a})`,
  Translate: (a, b) => `transform: translate(${a},${b})`,
  Translate3d: (a, b, c) => `transform: translate3d(${a},${b},${c})`,
  TranslateX: a => `transform: translateX(${a})`,
  TranslateY: a => `transform: translateY(${a})`,
  TranslateZ: a => `transform: translateZ(${a})`,
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
  W: mapArgs(
    a => `width: ${a}`,
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
  Fill: mapArgs(a => `fill: ${a}`, color),
  Stk: mapArgs(a => `stroke: ${a}`, color),
  Stkw: mapArgs(a => `stroke-width: ${a}`, lookup({ i: "inherit" })),
  Stklc: mapArgs(
    a => `stroke-linecap: ${a}`,
    lookup({ i: "inherit", b: "butt", r: "round", s: "square" }),
  ),
  Stklj: mapArgs(
    a => `stroke-linejoin: ${a}`,
    lookup({ i: "inherit", b: "bevel", r: "round", m: "miter" }),
  ),
  BfcHack: `
    display: table-cell;
    width: 1600px;
    *width: auto;
    zoom: 1;
  `,
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
  IbBox: `
    display: inline-block;
    *display: inline;
    zoom: 1;
    vertical-align: top;
  `,
};

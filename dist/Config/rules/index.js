"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
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
const rules = {
    Ac: utils_1.mapArgs((a) => `align-content: ${a}`, utils_1.lookup({
        fs: "flex-start",
        fe: "flex-end",
        c: "center",
        sb: "space-between",
        sa: "space-around",
        st: "stretch",
    })),
    Ai: utils_1.mapArgs((a) => `align-items: ${a}`, utils_1.lookup({
        fs: "flex-start",
        fe: "flex-end",
        c: "center",
        b: "baseline",
        st: "stretch",
    })),
    Animdel: (a) => `animation-delay: ${a}`,
    Animdir: utils_1.mapArgs((a) => `animation-direction: ${a}`, utils_1.lookup({
        a: "alternate",
        ar: "alternate-reverse",
        n: "normal",
        r: "reverse",
    })),
    Animdur: (a) => `animation-duration: ${a}`,
    Animfm: utils_1.mapArgs((a) => `animation-fill-mode: ${a}`, utils_1.lookup({ b: "backwards", bo: "both", f: "forwards", n: "none" })),
    Animic: utils_1.mapArgs((a) => `animation-iteration-count: ${a}`, utils_1.lookup({ i: "infinite" })),
    Animn: utils_1.mapArgs((a) => `animation-name: ${a}`, utils_1.lookup({ n: "none" })),
    Animps: utils_1.mapArgs((a) => `animation-play-state: ${a}`, utils_1.lookup({ p: "paused", r: "running" })),
    Animtf: utils_1.mapArgs((a) => `animation-timing-function: ${a}`, utils_1.lookup({
        e: "ease",
        ei: "ease-in",
        eo: "ease-out",
        eio: "ease-in-out",
        l: "linear",
        se: "step-end",
        ss: "step-start",
    })),
    Ap: utils_1.mapArgs((a) => `appearance: ${a}`, utils_1.lookup({ a: "auto", n: "none" })),
    As: utils_1.mapArgs((a) => `align-self: ${a}`, utils_1.lookup({
        a: "auto",
        fs: "flex-start",
        fe: "flex-end",
        c: "center",
        b: "baseline",
        st: "stretch",
    })),
    B: utils_1.mapArgs((a) => `bottom: ${a}`, [
        utils_1.normalizeLength,
        utils_1.lookup({ a: "auto" }),
    ]),
    Bd: [
        "border-width: 1px; border-style: solid",
        utils_1.mapArgs((a) => `border: ${a}`, utils_1.lookup({ 0: "0", n: "none" })),
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
    Bdb: (a) => `border-bottom: ${a}`,
    Bdbc: utils_1.mapArgs((a) => `border-bottom-color: ${a}`, utils_1.color),
    Bdbs: utils_1.mapArgs((a) => `border-bottom-style: ${a}`, utils_1.lookup(borderStyles)),
    Bdbw: utils_1.mapArgs((a) => `border-bottom-width: ${a}`, utils_1.lookup(borderWidths)),
    Bdc: utils_1.mapArgs((a) => `border-color: ${a}`, utils_1.color),
    Bdcl: utils_1.mapArgs((a) => `border-collapse: ${a}`, utils_1.lookup({ c: "collapse", s: "separate" })),
    Bdend: (a) => `border-__END__: ${a}`,
    Bdendc: utils_1.mapArgs((a) => `border-__END__-color: ${a}`, utils_1.color),
    Bdends: utils_1.mapArgs((a) => `border-__END__-style: ${a}`, utils_1.lookup(borderStyles)),
    Bdendw: utils_1.mapArgs((a) => `border-__END__-width: ${a}`, utils_1.lookup(borderWidths)),
    Bdrs: (a) => `border-radius: ${a}`,
    Bdrsbend: (a) => `border-bottom-__END__-radius: ${a}`,
    Bdrsbstart: (a) => `border-bottom-__START__-radius: ${a}`,
    Bdrstend: (a) => `border-top-__END__-radius: ${a}`,
    Bdrststart: (a) => `border-top-__START__-radius: ${a}`,
    Bds: utils_1.mapArgs((a) => `border-style: ${a}`, utils_1.lookup(borderStyles)),
    Bdsp: utils_1.mapArgs((a, b = "") => `border-spacing: ${a} ${b}`, utils_1.lookup({ i: "inherit" }), utils_1.lookup({ i: "inherit" })),
    Bdstart: (a) => `border-__START__: ${a}`,
    Bdstartc: utils_1.mapArgs((a) => `border-__START__-color: ${a}`, utils_1.color),
    Bdstarts: utils_1.mapArgs((a) => `border-__START__-style: ${a}`, utils_1.lookup(borderStyles)),
    Bdstartw: utils_1.mapArgs((a) => `border-__START__-width: ${a}`, utils_1.lookup(borderWidths)),
    Bdt: (a) => `border-top: ${a}`,
    Bdtc: utils_1.mapArgs((a) => `border-top-color: ${a}`, utils_1.color),
    Bdts: utils_1.mapArgs((a) => `border-top-style: ${a}`, utils_1.lookup(borderStyles)),
    Bdtw: utils_1.mapArgs((a) => `border-top-width: ${a}`, utils_1.lookup(borderWidths)),
    Bdw: utils_1.mapArgs((a) => `border-width: ${a}`, utils_1.lookup(borderWidths)),
    Bdx: (a) => `border-__START__: ${a}; border-__END__: ${a}`,
    Bdy: (a) => `border-top: ${a}; border-bottom: ${a}`,
    BfcHack: `
    display: table-cell;
    width: 1600px;
    *width: auto;
    zoom: 1;
  `,
    Bfv: utils_1.mapArgs((a) => `backface-visibility: ${a}`, utils_1.lookup({ h: "hidden", v: "visible" })),
    Bg: utils_1.mapArgs((a) => `background: ${a}`, utils_1.lookup({ n: "none", t: "transparent" })),
    Bga: utils_1.mapArgs((a) => `background-attachment: ${a}`, utils_1.lookup({ f: "fixed", l: "local", s: "scroll" })),
    Bgc: utils_1.mapArgs((a) => `background-color: ${a}`, utils_1.color),
    Bgcp: utils_1.mapArgs((a) => `background-clip: ${a}`, utils_1.lookup({ bb: "border-box", cb: "content-box", pb: "padding-box" })),
    Bgi: utils_1.mapArgs((a) => `background-image: ${a}`, utils_1.lookup({ n: "none" })),
    Bgo: utils_1.mapArgs((a) => `background-origin: ${a}`, utils_1.lookup({ bb: "border-box", cb: "content-box", pb: "padding-box" })),
    Bgp: utils_1.mapArgs((a, b = "") => `background-position: ${a} ${b}`, utils_1.lookup({
        start_t: "__START__ 0",
        end_t: "__END__ 0",
        start_b: "__START__ 100%",
        end_b: "__END__ 100%",
        start_c: "__START__ center",
        end_c: "__END__ center",
        c_b: "center 100%",
        c_t: "center 0",
        c: "center",
    })),
    Bgpx: utils_1.mapArgs((a) => `background-position-x: ${a}`, utils_1.lookup({ start: "__START__", end: "__END__", c: "50%" })),
    Bgpy: utils_1.mapArgs((a) => `background-position-y: ${a}`, utils_1.lookup({ t: "0", b: "100%", c: "50%" })),
    Bgr: utils_1.mapArgs((a) => `background-repeat: ${a}`, utils_1.lookup({
        nr: "no-repeat",
        rx: "repeat-x",
        ry: "repeat-y",
        r: "repeat",
        s: "space",
        ro: "round",
    })),
    Bgz: utils_1.mapArgs((a) => `background-size: ${a}`, utils_1.lookup({ a: "auto", ct: "contain", cv: "cover" })),
    Blur: (a) => `filter: blur(${a})`,
    Brightness: (a) => `filter: brightness(${a})`,
    Bxsh: utils_1.mapArgs((a) => `box-shadow: ${a}`, utils_1.lookup({ n: "none" })),
    Bxz: utils_1.mapArgs((a) => `box-sizing: ${a}`, utils_1.lookup({ cb: "content-box", pb: "padding-box", bb: "border-box" })),
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
    Cl: utils_1.mapArgs((a) => `clear: ${a}`, utils_1.lookup({ n: "none", b: "both", start: "__START__", end: "__END__" })),
    C: utils_1.mapArgs((a) => `color: ${a}`, utils_1.color),
    Cnt: utils_1.mapArgs((a) => `content: ${a}`, utils_1.lookup({
        n: "none",
        nor: "normal",
        oq: "open-quote",
        cq: "close-quote",
        noq: "no-open-quote",
        ncq: "no-close-quote",
    })),
    Contrast: (a) => `filter: contrast(${a})`,
    Ctn: utils_1.mapArgs((a) => `contain: ${a}`, utils_1.lookup({
        n: "none",
        st: "strict",
        c: "content",
        z: "size",
        l: "layout",
        s: "style",
        p: "paint",
    })),
    Cur: utils_1.mapArgs((a) => `cursor: ${a}`, utils_1.lookup({
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
    })),
    D: utils_1.mapArgs((a) => `display: ${a}`, utils_1.lookup({
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
    })),
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
    End: utils_1.mapArgs((a) => `__END__: ${a}`, [
        utils_1.normalizeLength,
        utils_1.lookup({ a: "auto" }),
    ]),
    Ff: utils_1.mapArgs((a) => `font-family: ${a}`, utils_1.lookup({
        c: '"Monotype Corsiva", "Comic Sans MS", cursive',
        f: "Capitals, Impact, fantasy",
        m: 'Monaco, "Courier New", monospace',
        s: 'Georgia, "Times New Roman", serif',
        ss: "Helvetica, Arial, sans-serif",
    })),
    Fil: utils_1.mapArgs((a) => `filter: ${a}`, utils_1.lookup({ n: "none" })),
    Fill: utils_1.mapArgs((a) => `fill: ${a}`, utils_1.color),
    Fl: utils_1.mapArgs((a) => `float: ${a}`, utils_1.lookup({ n: "none", start: "__START__", end: "__END__" })),
    Fs: utils_1.mapArgs((a) => `font-style: ${a}`, utils_1.lookup({ n: "normal", i: "italic", o: "oblique" })),
    Fv: utils_1.mapArgs((a) => `font-variant: ${a}`, utils_1.lookup({ n: "normal", sc: "small-caps" })),
    H: utils_1.mapArgs((a) => `height: ${a}`, [
        utils_1.normalizeLength,
        utils_1.lookup({
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
    Fw: utils_1.mapArgs((a) => `font-weight: ${a}`, utils_1.lookup({
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
    })),
    Fx: utils_1.mapArgs((a) => `flex: ${a}`, [
        utils_1.normalizeLength,
        utils_1.lookup({ a: "auto", n: "none" }),
    ]),
    Fxb: utils_1.mapArgs((a) => `flex-basis: ${a}`, [
        utils_1.normalizeLength,
        utils_1.lookup({ a: "auto", n: "none" }),
    ]),
    Fxd: utils_1.mapArgs((a) => `flex-direction: ${a}`, utils_1.lookup({ r: "row", rr: "row-reverse", c: "column", cr: "column-reverse" })),
    Fxf: utils_1.mapArgs((a) => `flex-flow: ${a}`, utils_1.lookup({
        r: "row",
        rr: "row-reverse",
        c: "column",
        cr: "column-reverse",
        nw: "nowrap",
        w: "wrap",
        wr: "wrap-reverse",
    })),
    Fxg: (a) => `flex-grow: ${a}`,
    Fxs: (a) => `flex-shrink: ${a}`,
    Fxw: utils_1.mapArgs((a) => `flex-wrap: ${a}`, utils_1.lookup({ nw: "nowrap", w: "wrap", wr: "wrap-reverse" })),
    Fz: (a) => `font-size: ${a}`,
    Grayscale: (a) => `filter: grayscale(${a})`,
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
    HueRotate: (a) => `filter: hue-rotate(${a})`,
    Hy: utils_1.mapArgs((a) => `hyphens: ${a}`, utils_1.lookup({ a: "auto", n: "normal", m: "manual" })),
    IbBox: `
    display: inline-block;
    *display: inline;
    zoom: 1;
    vertical-align: top;
  `,
    Invert: (a) => `filter: invert(${a})`,
    Jc: utils_1.mapArgs((a) => `justify-content: ${a}`, utils_1.lookup({
        fs: "flex-start",
        fe: "flex-end",
        c: "center",
        sb: "space-between",
        sa: "space-around",
        se: "space-evenly",
        s: "stretch",
    })),
    Lh: utils_1.mapArgs((a) => `line-height: ${a}`, utils_1.lookup({ n: "normal" })),
    M: utils_1.mapArgs((a) => `margin: ${a}`, utils_1.lookup({ 0: "0", a: "auto" })),
    LineClamp: (a, b = "") => `
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
    Lisi: utils_1.mapArgs((a) => `list-style-image: ${a}`, utils_1.lookup({ n: "none" })),
    Lisp: utils_1.mapArgs((a) => `list-style-position: ${a}`, utils_1.lookup({ i: "inside", o: "outside" })),
    List: utils_1.mapArgs((a) => `list-style-type: ${a}`, utils_1.lookup({
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
    })),
    Lts: utils_1.mapArgs((a) => `letter-spacing: ${a}`, utils_1.lookup({ n: "normal" })),
    Mah: utils_1.mapArgs((a) => `max-height: ${a}`, utils_1.lookup({
        a: "auto",
        maxc: "max-content",
        minc: "min-content",
        fa: "fill-available",
        fc: "fit-content",
    })),
    Matrix: (a) => `transform: matrix(${a})`,
    Matrix3d: (a) => `transform: matrix(${a})`,
    Maw: utils_1.mapArgs((a) => `max-width: ${a}`, utils_1.lookup({
        n: "none",
        fa: "fill-available",
        fc: "fit-content",
        maxc: "max-content",
        minc: "min-content",
    })),
    Mb: utils_1.mapArgs((a) => `margin-bottom: ${a}`, utils_1.lookup({ 0: "0", a: "auto" })),
    Mend: utils_1.mapArgs((a) => `margin-__END__: ${a}`, utils_1.lookup({ 0: "0", a: "auto" })),
    Mih: utils_1.mapArgs((a) => `min-height: ${a}`, [
        utils_1.normalizeLength,
        utils_1.lookup({
            a: "auto",
            fa: "fill-available",
            fc: "fit-content",
            maxc: "max-content",
            minc: "min-content",
        }),
    ]),
    Miw: utils_1.mapArgs((a) => `min-width: ${a}`, [
        utils_1.normalizeLength,
        utils_1.lookup({
            a: "auto",
            fa: "fill-available",
            fc: "fit-content",
            ini: "initial",
            maxc: "max-content",
            minc: "min-content",
        }),
    ]),
    Mstart: utils_1.mapArgs((a) => `margin-__START__: ${a}`, utils_1.lookup({ 0: "0", a: "auto" })),
    Mt: utils_1.mapArgs((a) => `margin-top: ${a}`, utils_1.lookup({ 0: "0", a: "auto" })),
    Mx: utils_1.mapArgs((a) => `margin-__START__: ${a}; margin-__END__: ${a}`, utils_1.lookup({ 0: "0", a: "auto" })),
    My: utils_1.mapArgs((a) => `margin-top: ${a}; margin-bottom: ${a}`, utils_1.lookup({ 0: "0", a: "auto" })),
    Objf: utils_1.mapArgs((a) => `object-fit: ${a}`, utils_1.lookup({
        ct: "contain",
        cv: "cover",
        f: "fill",
        n: "none",
        sd: "scale-down",
    })),
    O: utils_1.mapArgs((a) => `outline: ${a}`, utils_1.lookup({ 0: "0", n: "none" })),
    Op: utils_1.mapArgs((a) => `opacity: ${a}`, utils_1.lookup({ 0: "0", 1: "1" })),
    Opacity: (a) => `filter: opacity(${a})`,
    Or: (a) => `order: ${a}`,
    Ov: utils_1.mapArgs((a) => `overflow: ${a}`, utils_1.lookup(overflow)),
    Ovs: utils_1.mapArgs((a) => `-webkit-overflow-scrolling: ${a}`, utils_1.lookup({ a: "auto", touch: "touch" })),
    P: (a) => `padding: ${a}`,
    Ovx: utils_1.mapArgs((a) => `overflow-x: ${a}`, utils_1.lookup(overflow)),
    Ovy: utils_1.mapArgs((a) => `overflow-y: ${a}`, utils_1.lookup(overflow)),
    Pb: (a) => `padding-bottom: ${a}`,
    Pe: utils_1.mapArgs((a) => `pointer-events: ${a}`, utils_1.lookup({
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
    })),
    Pend: (a) => `padding-__END__: ${a}`,
    Pos: utils_1.mapArgs((a) => `position: ${a}`, utils_1.lookup({
        a: "absolute",
        f: "fixed",
        r: "relative",
        s: "static",
        st: "sticky",
    })),
    Prs: utils_1.mapArgs((a) => `perspective: ${a}`, utils_1.lookup({ n: "none" })),
    Prso: utils_1.mapArgs((a, b = "") => `perspective-origin: ${a} ${b}`, utils_1.lookup(transformOrPerspectiveOrigins), utils_1.lookup(transformOrPerspectiveOrigins)),
    Pstart: (a) => `padding-__START__: ${a}`,
    Pt: (a) => `padding-top: ${a}`,
    Px: (a) => `padding-__START__: ${a}; padding-__END__: ${a}`,
    Py: (a) => `padding-top: ${a}; padding-bottom: ${a}`,
    Rotate: (a) => `transform: rotate(${a})`,
    Rotate3d: (a, b = "", c = "", d = "") => {
        return `transform: rotate3d(${a},${b},${c},${d})`;
    },
    RotateX: (a) => `transform: rotateX(${a})`,
    RotateY: (a) => `transform: rotateY(${a})`,
    RotateZ: (a) => `transform: rotateZ(${a})`,
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
    Rsz: utils_1.mapArgs((a) => `resize: ${a}`, utils_1.lookup({ n: "none", b: "both", h: "horizontal", v: "vertical" })),
    Saturate: (a) => `filter: saturate(${a})`,
    Scale: (a, b = "") => `transform: scale(${a},${b})`,
    Scale3d: (a, b = "", c = "") => {
        return `transform: scale3d(${a},${b},${c})`;
    },
    ScaleX: (a) => `transform: scaleX(${a})`,
    ScaleY: (a) => `transform: scaleY(${a})`,
    Sepia: (a) => `filter: sepia(${a})`,
    Skew: (a, b = "") => `transform: skew(${a},${b})`,
    SkewX: (a) => `transform: skewX(${a})`,
    SkewY: (a) => `transform: skewY(${a})`,
    Start: utils_1.mapArgs((a) => `__START__: ${a}`, [
        utils_1.normalizeLength,
        utils_1.lookup({ a: "auto" }),
    ]),
    Stk: utils_1.mapArgs((a) => `stroke: ${a}`, utils_1.color),
    Stklc: utils_1.mapArgs((a) => `stroke-linecap: ${a}`, utils_1.lookup({ i: "inherit", b: "butt", r: "round", s: "square" })),
    Stklj: utils_1.mapArgs((a) => `stroke-linejoin: ${a}`, utils_1.lookup({ i: "inherit", b: "bevel", r: "round", m: "miter" })),
    Stkw: utils_1.mapArgs((a) => `stroke-width: ${a}`, utils_1.lookup({ i: "inherit" })),
    StretchedBox: `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
    T: utils_1.mapArgs((a) => `top: ${a}`, [utils_1.normalizeLength, utils_1.lookup({ a: "auto" })]),
    Ta: utils_1.mapArgs((a) => `text-align: ${a}`, utils_1.lookup({
        c: "center",
        e: "end",
        end: "__END__",
        j: "justify",
        mp: "match-parent",
        s: "start",
        start: "__START__",
    })),
    Tal: utils_1.mapArgs((a) => `text-align-last: ${a}`, utils_1.lookup({
        a: "auto",
        c: "center",
        e: "end",
        end: "__END__",
        j: "justify",
        s: "start",
        start: "__START__",
    })),
    Tbl: utils_1.mapArgs((a) => `table-layout: ${a}`, utils_1.lookup({ a: "auto", f: "fixed" })),
    Td: utils_1.mapArgs((a) => `text-decoration: ${a}`, utils_1.lookup({ lt: "line-through", n: "none", o: "overline", u: "underline" })),
    Ti: (a) => `text-indent: ${a}`,
    Tov: utils_1.mapArgs((a) => `text-overflow: ${a}`, utils_1.lookup({ c: "clip", e: "ellipsis" })),
    Tr: utils_1.mapArgs((a) => `text-replace: ${a}`, utils_1.lookup({ n: "none" })),
    Translate: (a, b = "") => `transform: translate(${a},${b})`,
    Translate3d: (a, b = "", c = "") => {
        return `transform: translate3d(${a},${b},${c})`;
    },
    TranslateX: (a) => `transform: translateX(${a})`,
    TranslateY: (a) => `transform: translateY(${a})`,
    TranslateZ: (a) => `transform: translateZ(${a})`,
    Tren: utils_1.mapArgs((a) => `text-rendering: ${a}`, utils_1.lookup({
        a: "auto",
        os: "optimizeSpeed",
        ol: "optimizeLegibility",
        gp: "geometricPrecision",
    })),
    Trfo: utils_1.mapArgs((a, b = "") => `transform-origin: ${a} ${b}`, utils_1.lookup(transformOrPerspectiveOrigins), utils_1.lookup(transformOrPerspectiveOrigins)),
    Trfs: utils_1.mapArgs((a) => `transform-style: ${a}`, utils_1.lookup({ f: "flat", p: "preserve-3d" })),
    Trsde: utils_1.mapArgs((a) => `transition-delay: ${a}`, utils_1.lookup({ i: "initial" })),
    Trsdu: (a) => `transition-duration: ${a}`,
    Trsp: utils_1.mapArgs((a) => `transition-property: ${a}`, utils_1.lookup({ a: "all" })),
    Trstf: utils_1.mapArgs((a) => `transition-timing-function: ${a}`, utils_1.lookup({
        e: "ease",
        ei: "ease-in",
        eo: "ease-out",
        eio: "ease-in-out",
        l: "linear",
        ss: "step-start",
        se: "step-end",
    })),
    Tsh: utils_1.mapArgs((a) => `text-shadow: ${a}`, utils_1.lookup({ n: "none" })),
    Tt: utils_1.mapArgs((a) => `text-transform: ${a}`, utils_1.lookup({ n: "none", c: "capitalize", u: "uppercase", l: "lowercase" })),
    Us: utils_1.mapArgs((a) => `user-select: ${a}`, utils_1.lookup({
        a: "all",
        el: "element",
        els: "elements",
        n: "none",
        t: "text",
        to: "toggle",
    })),
    Va: utils_1.mapArgs((a) => `vertical-align: ${a}`, utils_1.lookup({
        b: "bottom",
        bl: "baseline",
        m: "middle",
        sub: "sub",
        sup: "super",
        t: "top",
        tb: "text-bottom",
        tt: "text-top",
    })),
    V: utils_1.mapArgs((a) => `visibility: ${a}`, utils_1.lookup({ v: "visible", h: "hidden", c: "collapse" })),
    W: utils_1.mapArgs((a) => `width: ${a}`, [
        utils_1.normalizeLength,
        utils_1.lookup({
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
    Whs: utils_1.mapArgs((a) => `white-space: ${a}`, utils_1.lookup({
        n: "normal",
        p: "pre",
        nw: "nowrap",
        pw: "pre-wrap",
        pl: "pre-line",
    })),
    Whsc: utils_1.mapArgs((a) => `white-space-collapse: ${a}`, utils_1.lookup({
        n: "normal",
        ka: "keep-all",
        l: "loose",
        bs: "break-strict",
        ba: "break-all",
    })),
    Wob: utils_1.mapArgs((a) => `word-break: ${a}`, utils_1.lookup({ ba: "break-all", ka: "keep-all", n: "normal" })),
    Wow: utils_1.mapArgs((a) => `word-wrap: ${a}`, utils_1.lookup({ bw: "break-word", n: "normal" })),
    Z: utils_1.mapArgs((a) => `z-index: ${a}`, utils_1.lookup({ a: "auto" })),
    Zoom: "zoom: 1",
};
exports.default = rules;

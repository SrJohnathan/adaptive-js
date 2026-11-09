/*
 * Copyright (c) 2026 Antonio Johnathan
 * SSR constants - sem lógica, só dados
 */
export const FRAGMENT = Symbol.for("adaptive.fragment");
export const SVG_TAGS = new Set([
    "svg", "circle", "defs", "g", "line", "path", "rect", "text", "ellipse", "polygon", "polyline",
    "use", "clipPath", "mask", "linearGradient", "radialGradient", "stop", "foreignObject"
]);
export const SVG_ATTRIBUTE_NAME_MAP = {
    className: "class",
    strokeWidth: "stroke-width",
    strokeLinecap: "stroke-linecap",
    strokeLinejoin: "stroke-linejoin",
    strokeDasharray: "stroke-dasharray",
    strokeDashoffset: "strokeDashoffset",
    strokeMiterlimit: "stroke-miterlimit",
    fillRule: "fill-rule",
    clipRule: "clip-rule",
    viewBox: "viewBox",
    preserveAspectRatio: "preserveAspectRatio",
    vectorEffect: "vector-effect",
    xmlnsXlink: "xmlns:xlink"
};
export const SELF_CLOSING_TAGS = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"
]);
//# sourceMappingURL=constants.js.map
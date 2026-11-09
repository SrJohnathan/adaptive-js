/*
 * Copyright (c) 2026 Antonio Johnathan
 * DOM helpers - sem VDOM
 */
import { MATHML_NAMESPACE, SVG_ATTRIBUTE_NAME_MAP, SVG_NAMESPACE } from "./constants.js";
export function resolveChildNamespace(tag, parentNamespace) {
    if (tag === "svg")
        return SVG_NAMESPACE;
    if (tag === "math")
        return MATHML_NAMESPACE;
    if (tag === "foreignObject")
        return null;
    return parentNamespace;
}
export function shouldAssignAsProperty(element, namespace, key) {
    if (namespace === SVG_NAMESPACE || namespace === MATHML_NAMESPACE)
        return false;
    return key in element;
}
export function resolveDomAttributeName(key, namespace) {
    if (namespace === SVG_NAMESPACE || namespace === MATHML_NAMESPACE) {
        return SVG_ATTRIBUTE_NAME_MAP[key] ?? key;
    }
    return key === "className" ? "class" : key;
}
export function shouldAssignAsPropertyWithMediaCheck(element, key) {
    if (element instanceof HTMLMediaElement && ["currentTime", "volume", "playbackRate"].includes(key)) {
        return true;
    }
    return false;
}
//# sourceMappingURL=dom.js.map
/*
 * Placeholder - keyed reactive block já existente no projeto
 */
export function getVNodeKey(value) {
    if (value && typeof value === "object") {
        return value.key ?? value.props?.key ?? null;
    }
    return null;
}
export function mountKeyedReactiveFunction(vnode, namespace, renderToDOM) {
    // delega para implementação real existente
    const { mountKeyedReactiveFunction: real } = require("../keyed-reactive-block.js");
    if (real)
        return real(vnode, namespace, renderToDOM);
    // fallback mínimo
    const start = document.createTextNode("");
    const end = document.createTextNode("");
    const frag = document.createDocumentFragment();
    frag.appendChild(start);
    frag.appendChild(end);
    return frag;
}
//# sourceMappingURL=keyed-reactive-block.js.map
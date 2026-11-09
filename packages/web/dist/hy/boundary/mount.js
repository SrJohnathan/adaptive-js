/*
 * Copyright (c) 2026 Antonio Johnathan
 * Mount client-only - sem VDOM, usa renderToDOM direto
 */
import { createElement } from "@adaptive-js/core";
import { renderToDOM } from "../hydrate/render-to-dom.js";
export function mountClientComponent(root, Component, props) {
    root.replaceChildren(renderToDOM(createElement(Component, props)));
    return Array.from(root.childNodes);
}
export function mountClientComponentBetweenMarkers(start, end, Component, props) {
    const parent = start.parentNode;
    if (!parent)
        return [];
    // remove conteúdo SSR entre markers (client-only não preserva)
    let cur = start.nextSibling;
    while (cur && cur !== end) {
        const next = cur.nextSibling;
        parent.removeChild(cur);
        cur = next;
    }
    const rendered = renderToDOM(createElement(Component, props));
    const mounted = rendered.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? Array.from(rendered.childNodes) : [rendered];
    parent.insertBefore(rendered, end);
    start.remove();
    end.remove();
    return mounted;
}
//# sourceMappingURL=mount.js.map
/*
 * Copyright (c) 2026 Antonio Johnathan
 * renderToDOM - mount client-mode, sem hidratação, sem VDOM
 */
import { CONTEXT_PROVIDER_TAG } from "../front/context-runtime.js";
import { runWithContext, untrack } from "../reactive/index.js";
import { createReactiveEffect } from "../reactive/events.js";
import { events } from "../reactive/index.js";
import { resolveChildNamespace, resolveDomAttributeName, shouldAssignAsProperty } from "./dom.js";
import { applyStyleObject } from "./style.js";
import { mountKeyedReactiveFunction } from "./keyed-reactive-block.js";
export function renderToDOM(vnode, namespace = null) {
    if (vnode instanceof Node)
        return vnode;
    if (vnode == null || vnode === false || vnode === true)
        return document.createComment("adaptive-empty");
    if (typeof vnode === "string" || typeof vnode === "number")
        return document.createTextNode(String(vnode));
    if (Array.isArray(vnode)) {
        const fragment = document.createDocumentFragment();
        for (const child of vnode) {
            fragment.appendChild(renderToDOM(child, namespace));
        }
        return fragment;
    }
    if (typeof vnode === "function") {
        return mountKeyedReactiveFunction(vnode, namespace, renderToDOM);
    }
    if (vnode.tag === CONTEXT_PROVIDER_TAG) {
        return runWithContext(vnode.props.context.id, vnode.props.value, () => renderToDOM(vnode.children ?? [], namespace));
    }
    if (vnode.tag === "Fragment" || typeof vnode.tag === "symbol") {
        const fragment = document.createDocumentFragment();
        const children = vnode.children ?? [];
        for (const child of (Array.isArray(children) ? children : [children])) {
            fragment.appendChild(renderToDOM(child, namespace));
        }
        return fragment;
    }
    if (typeof vnode.tag === "function") {
        return untrack(() => renderToDOM(vnode.tag({ ...(vnode.props ?? {}), children: vnode.children ?? [] }), namespace));
    }
    const nextNamespace = resolveChildNamespace(vnode.tag, namespace);
    const el = nextNamespace ? document.createElementNS(nextNamespace, vnode.tag) : document.createElement(vnode.tag);
    const props = vnode.props ?? {};
    for (const [key, value] of Object.entries(props)) {
        if (key === "children" || key === "client")
            continue;
        if (key === "ref") {
            if (typeof value === "function")
                value(el);
            else if (value && typeof value === "object")
                value.current = el;
            continue;
        }
        if (key === "xmlns" && nextNamespace)
            continue;
        if (key === "className") {
            if (typeof value === "function") {
                createReactiveEffect(() => { el.setAttribute("class", value() ?? ""); });
            }
            else {
                el.setAttribute("class", value);
            }
            continue;
        }
        if (key.startsWith("on") && typeof value === "function") {
            el.addEventListener(key.slice(2).toLowerCase(), value);
            continue;
        }
        if (key === "style") {
            if (typeof value === "function") {
                events(() => { applyStyleObject(el, value()); });
            }
            else if (typeof value === "object" && value !== null) {
                // suporta style={{ color: () => ... }}
                for (const [styleKey, styleValue] of Object.entries(value)) {
                    if (typeof styleValue === "function") {
                        events(() => {
                            const resolved = styleValue();
                            if (resolved == null || resolved === false)
                                el.style.removeProperty(styleKey.replace(/([A-Z])/g, "-$1").toLowerCase());
                            else
                                el.style[styleKey] = resolved;
                        });
                    }
                    else if (styleValue != null && styleValue !== false) {
                        el.style[styleKey] = styleValue;
                    }
                }
            }
            continue;
        }
        if (value === false || value == null)
            continue;
        if (typeof value === "function") {
            createReactiveEffect(() => {
                const resolved = value();
                if (resolved === false || resolved == null) {
                    el.removeAttribute(resolveDomAttributeName(key, nextNamespace));
                    return;
                }
                if (shouldAssignAsProperty(el, nextNamespace, key))
                    el[key] = resolved;
                else
                    el.setAttribute(resolveDomAttributeName(key, nextNamespace), String(resolved));
            }, "layout");
            continue;
        }
        if (shouldAssignAsProperty(el, nextNamespace, key))
            el[key] = value;
        else
            el.setAttribute(resolveDomAttributeName(key, nextNamespace), String(value));
    }
    const children = vnode.children ?? [];
    const list = Array.isArray(children) ? children : [children];
    for (const child of list) {
        el.appendChild(renderToDOM(child, nextNamespace));
    }
    return el;
}
//# sourceMappingURL=render-to-dom.js.map
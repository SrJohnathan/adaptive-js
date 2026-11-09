/*
 * Copyright (c) 2026 Antonio Johnathan
 * Hidratação fina - sem VDOM, só anchors e efeitos
 */
import { REACTIVE_ASYNC_END, REACTIVE_ASYNC_START, REACTIVE_CHILD_END, REACTIVE_CHILD_START, REACTIVE_LIST_END, REACTIVE_LIST_START, REACTIVE_STRUCT_END, REACTIVE_STRUCT_START, } from "../hydration/client-boundary.js";
import { cleanupEffectScope, createEffectScope, runWithEffectScope } from "../reactive/index.js";
import { renderToDOM } from "./render-to-dom.js";
import { createReactiveEffect } from "../reactive/events.js";
import { getVNodeKey } from "./keyed-reactive-block.js";
import { findMarkerPairBetweenMarkers, findMarkerPairInRoot } from "./reactive-markers.js";
import { debugHydrationLog, warnMismatch } from "./mismatch.js";
import { collectSiblingNodesBetween } from "./markers.js";
function isPromiseLike(v) { return v != null && typeof v === "object" && typeof v.then === "function"; }
export function findReactiveMarkers(root, id) {
    return findMarkerPairInRoot(root, `${REACTIVE_CHILD_START}:${id}`, `${REACTIVE_CHILD_END}:${id}`);
}
export function findReactiveMarkersBetweenMarkers(start, end, id) {
    return findMarkerPairBetweenMarkers(start, end, `${REACTIVE_CHILD_START}:${id}`, `${REACTIVE_CHILD_END}:${id}`);
}
export function findReactiveStructMarkers(root, id) {
    return findMarkerPairInRoot(root, `${REACTIVE_STRUCT_START}:${id}`, `${REACTIVE_STRUCT_END}:${id}`);
}
export function findReactiveStructMarkersBetweenMarkers(start, end, id) {
    return findMarkerPairBetweenMarkers(start, end, `${REACTIVE_STRUCT_START}:${id}`, `${REACTIVE_STRUCT_END}:${id}`);
}
export function findReactiveListMarkers(root, id) {
    return findMarkerPairInRoot(root, `${REACTIVE_LIST_START}:${id}`, `${REACTIVE_LIST_END}:${id}`);
}
export function findReactiveListMarkersBetweenMarkers(start, end, id) {
    return findMarkerPairBetweenMarkers(start, end, `${REACTIVE_LIST_START}:${id}`, `${REACTIVE_LIST_END}:${id}`);
}
export function findReactiveAsyncMarkers(root, id) {
    return findMarkerPairInRoot(root, `${REACTIVE_ASYNC_START}:${id}`, `${REACTIVE_ASYNC_END}:${id}`);
}
export function findReactiveAsyncMarkersBetweenMarkers(start, end, id) {
    return findMarkerPairBetweenMarkers(start, end, `${REACTIVE_ASYNC_START}:${id}`, `${REACTIVE_ASYNC_END}:${id}`);
}
export function hydrateReactiveRangeWithMarkers(start, end, instruction) {
    if (!start || !end) {
        warnMismatch({ path: `hydrate.instruction.reactive-range.${instruction.id}`, message: "Reactive range markers not found", expected: `<!--${REACTIVE_CHILD_START}:${instruction.id}-->`, found: "nothing" });
        return;
    }
    const textNode = ensureReactiveTextNodeBetweenMarkers(start, end);
    if (!textNode)
        return;
    const parent = start.parentNode;
    if (parent) {
        parent.removeChild(start);
        parent.removeChild(end);
    }
    createHydratedReactiveTextBinding(textNode, instruction);
}
function ensureReactiveTextNodeBetweenMarkers(start, end) {
    const nodes = collectSiblingNodesBetween(start, end);
    if (nodes.length === 1 && nodes[0].nodeType === Node.TEXT_NODE)
        return nodes[0];
    const parent = start.parentNode;
    if (!parent)
        return null;
    const textNode = document.createTextNode(nodes.map((n) => n.textContent ?? "").join(""));
    parent.insertBefore(textNode, end);
    nodes.forEach((n) => parent.removeChild(n));
    return textNode;
}
function createHydratedReactiveTextBinding(textNode, instruction) {
    debugHydrationLog("[hydrate:range:bind]", instruction.id, textNode.data);
    createReactiveEffect(() => {
        const nextText = normalizeReactiveTextValue(instruction.getter());
        debugHydrationLog("[hydrate:range:run]", instruction.id, nextText);
        if (textNode.data !== nextText) {
            warnMismatch({ path: `hydrate.instruction.reactive-range.${instruction.id}`, message: "SSR text mismatch", expected: nextText, found: textNode.data, node: textNode });
        }
        textNode.data = nextText;
    });
}
function normalizeReactiveTextValue(value) {
    if (value == null || value === false)
        return "";
    if (Array.isArray(value))
        return value.map((i) => normalizeReactiveTextValue(i)).join("");
    return String(value);
}
export function hydrateReactiveStructWithMarkers(start, end, instruction) {
    hydrateReactiveContentWithMarkers(start, end, { id: instruction.id, kind: "reactive-struct", getter: instruction.render });
}
export function hydrateReactiveListWithMarkers(start, end, instruction) {
    hydrateReactiveContentWithMarkers(start, end, { id: instruction.id, kind: "reactive-list", getter: instruction.getter });
}
export function hydrateReactiveAsyncWithMarkers(start, end, instruction) {
    hydrateReactiveContentWithMarkers(start, end, { id: instruction.id, kind: "reactive-async", getter: instruction.getter });
}
function hydrateReactiveContentWithMarkers(start, end, config) {
    if (!start || !end) {
        warnMismatch({ path: `hydrate.instruction.${config.kind}.${config.id}`, message: "Reactive markers not found", expected: `markers for ${config.kind}:${config.id}`, found: "nothing" });
        return;
    }
    const parent = start.parentNode;
    if (!parent)
        return;
    const startAnchor = document.createComment(`adaptive-reactive-anchor-start:${config.id}`);
    const endAnchor = document.createComment(`adaptive-reactive-anchor-end:${config.id}`);
    parent.replaceChild(startAnchor, start);
    parent.replaceChild(endAnchor, end);
    let initialized = false;
    let pendingToken = 0;
    let currentScope = null;
    let currentKey = undefined;
    createReactiveEffect(() => {
        const nextValue = config.getter();
        const currentToken = ++pendingToken;
        const nextKey = getVNodeKey(nextValue);
        if (!initialized) {
            initialized = true;
            currentKey = nextKey;
            if (isPromiseLike(nextValue)) {
                void nextValue.then((resolved) => {
                    if (currentToken !== pendingToken)
                        return;
                    if (currentScope) {
                        cleanupEffectScope(currentScope);
                        currentScope = null;
                    }
                    currentScope = createEffectScope("hydrate-range");
                    currentKey = getVNodeKey(resolved);
                    replaceReactiveRangeContent(startAnchor, endAnchor, resolved, currentScope);
                });
                return;
            }
            currentScope = createEffectScope("hydrate-range");
            if (config.kind === "reactive-list") {
                replaceReactiveRangeContent(startAnchor, endAnchor, nextValue, currentScope);
            }
            else {
                runWithEffectScope(currentScope, () => { hydrateExistingReactiveContent(startAnchor, endAnchor, nextValue); });
            }
            return;
        }
        if (nextKey != null && currentKey != null && Object.is(nextKey, currentKey))
            return;
        if (isPromiseLike(nextValue)) {
            void nextValue.then((resolved) => {
                if (currentToken !== pendingToken)
                    return;
                const resolvedKey = getVNodeKey(resolved);
                if (resolvedKey != null && currentKey != null && Object.is(resolvedKey, currentKey))
                    return;
                if (currentScope) {
                    cleanupEffectScope(currentScope);
                    currentScope = null;
                }
                currentScope = createEffectScope("hydrate-range");
                currentKey = resolvedKey;
                replaceReactiveRangeContent(startAnchor, endAnchor, resolved, currentScope);
            });
            return;
        }
        if (currentScope) {
            cleanupEffectScope(currentScope);
            currentScope = null;
        }
        currentScope = createEffectScope("hydrate-range");
        currentKey = nextKey;
        replaceReactiveRangeContent(startAnchor, endAnchor, nextValue, currentScope);
    });
}
function replaceReactiveRangeContent(start, end, value, scope) {
    const parent = start.parentNode;
    if (!parent)
        return;
    let current = start.nextSibling;
    while (current && current !== end) {
        const next = current.nextSibling;
        parent.removeChild(current);
        current = next;
    }
    const insert = () => {
        const nextNodes = normalizeToNodes(value);
        nextNodes.forEach((node) => parent.insertBefore(node, end));
    };
    if (scope)
        runWithEffectScope(scope, insert);
    else
        insert();
}
function normalizeToNodes(value) {
    if (value == null || value === false)
        return [];
    if (Array.isArray(value))
        return value.flatMap((item) => normalizeToNodes(item));
    if (value instanceof Node)
        return [value];
    if (typeof value === "function")
        return normalizeToNodes(value());
    if (typeof value === "object" && value !== null && "tag" in value) {
        try {
            const frag = renderToDOM(value, null);
            if (frag instanceof DocumentFragment)
                return Array.from(frag.childNodes);
            return [frag];
        }
        catch {
            return [];
        }
    }
    return [document.createTextNode(String(value))];
}
function hydrateExistingReactiveContent(start, end, value) {
    // delega para inplace hydration - DOM-first, sem VDOM
    const { hydrateVNodeAgainstDOM } = require("./inplace.js");
    const cursor = { node: start.nextSibling, end, parent: start.parentNode };
    const { normalizeVNodeList } = require("./inplace.js");
    for (const vnode of normalizeVNodeList(value)) {
        hydrateVNodeAgainstDOM(vnode, cursor);
    }
}
// stubs para compat com keyed-reactive-block que espera getVNodeKey
//# sourceMappingURL=reactive.js.map
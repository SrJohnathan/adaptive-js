/*
 * Copyright (c) 2026 Antonio Johnathan
 * Hidratação fina - sem VDOM, só anchors e efeitos
 * FIX: Detecta mudanças de tipo de componente em .map() com componentes variados
 * Baseado na implementação monolítica que funciona perfeitamente
 */
import { REACTIVE_ASYNC_END, REACTIVE_ASYNC_START, REACTIVE_CHILD_END, REACTIVE_CHILD_START, REACTIVE_LIST_END, REACTIVE_LIST_START, REACTIVE_STRUCT_END, REACTIVE_STRUCT_START, } from "@adaptive-js/shared";
import { cleanupEffectScope, createEffectScope, runWithEffectScope } from "../../reactive/index.js";
import { renderToDOM } from "./render-to-dom.js";
import { createReactiveEffect } from "../../reactive/events.js";
import { findMarkerPairBetweenMarkers, findMarkerPairInRoot } from "./reactive-markers.js";
import { debugHydrationLog, warnMismatch } from "./mismatch.js";
import { collectSiblingNodesBetween } from "./markers.js";
import { hydrateVNodeAgainstDOM, normalizeVNodeList } from "./inplace.js";
import { getVNodeKey } from "../keyed-reactive-block.js";
function isPromiseLike(v) { return v != null && typeof v === "object" && typeof v.then === "function"; }
/**
 * Extrai assinatura de tipo para vnodes, detectando quando .map() renderiza tipos diferentes de componentes.
 * Para detectar mudanças em listas filtradas, também considera o tamanho do array.
 */
function getVNodeTypeSignature(value) {
    if (Array.isArray(value)) {
        if (value.length === 0)
            return "empty";
        // Para arrays, incluir o tamanho é crucial para detectar filtros
        const signatures = value.map((v) => getVNodeTypeSignature(v));
        const unique = new Set(signatures);
        const typeStr = unique.size === 1 ? signatures[0] : Array.from(unique).join("|");
        // Adiciona tamanho do array à assinatura para detectar mudanças de filtro
        return `[${value.length}]:${typeStr}`;
    }
    if (value && typeof value === "object" && "tag" in value) {
        const tag = value.tag;
        // Para divs e outros elementos host, também incluir a key se existir
        const key = value.key || value.props?.key;
        const baseType = typeof tag === "function" ? (tag.name || "Anon") : (typeof tag === "string" ? tag : "Sym");
        // Se tem key, inclui na assinatura (importante para detectar diferentes itens)
        if (key)
            return `${baseType}#${key}`;
        // Se não tem key, olha recursivamente nos children para detectar componentes aninhados
        const children = value.children;
        if (children) {
            const childSig = getVNodeTypeSignature(children);
            if (childSig && childSig !== "empty")
                return `${baseType}(${childSig})`;
        }
        return baseType;
    }
    if (typeof value === "function")
        return `Fn[${value.name || "?"}]`;
    return typeof value;
}
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
    let firstRun = true;
    createReactiveEffect(() => {
        const nextText = normalizeReactiveTextValue(instruction.getter());
        debugHydrationLog("[hydrate:range:run]", instruction.id, nextText);
        if (firstRun && textNode.data !== nextText) {
            warnMismatch({ path: `hydrate.instruction.reactive-range.${instruction.id}`, message: "SSR text mismatch", expected: nextText, found: textNode.data, node: textNode });
        }
        firstRun = false;
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
    // Usa Text nodes vazios como anchors invisíveis ao invés de comentários
    const startAnchor = document.createTextNode("");
    const endAnchor = document.createTextNode("");
    parent.replaceChild(startAnchor, start);
    parent.replaceChild(endAnchor, end);
    let initialized = false;
    let pendingToken = 0;
    let currentScope = null;
    let currentKey = undefined;
    let currentTypeSig = undefined;
    createReactiveEffect(() => {
        const nextValue = config.getter();
        const currentToken = ++pendingToken;
        const nextKey = getVNodeKey(nextValue);
        const nextTypeSig = config.kind === "reactive-list" ? getVNodeTypeSignature(nextValue) : undefined;
        if (!initialized) {
            initialized = true;
            currentKey = nextKey;
            currentTypeSig = nextTypeSig;
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
                    currentTypeSig = getVNodeTypeSignature(resolved);
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
        const keyUnchanged = nextKey != null && currentKey != null && Object.is(nextKey, currentKey);
        const typeUnchanged = config.kind === "reactive-list" ? nextTypeSig === currentTypeSig : true;
        if (keyUnchanged && typeUnchanged)
            return;
        if (isPromiseLike(nextValue)) {
            void nextValue.then((resolved) => {
                if (currentToken !== pendingToken)
                    return;
                const resolvedKey = getVNodeKey(resolved);
                const resolvedTypeSig = getVNodeTypeSignature(resolved);
                if (resolvedKey != null && currentKey != null && Object.is(resolvedKey, currentKey) && resolvedTypeSig === currentTypeSig)
                    return;
                if (currentScope) {
                    cleanupEffectScope(currentScope);
                    currentScope = null;
                }
                currentScope = createEffectScope("hydrate-range");
                currentKey = resolvedKey;
                currentTypeSig = resolvedTypeSig;
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
        currentTypeSig = nextTypeSig;
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
        nextNodes.forEach((node) => {
            parent.insertBefore(node, end);
        });
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
    // Delegação para in-place hydration - DOM-first, sem VDOM
    const cursor = { node: start.nextSibling, end, parent: start.parentNode };
    for (const vnode of normalizeVNodeList(value)) {
        hydrateVNodeAgainstDOM(vnode, cursor);
    }
}
// stubs para compat com keyed-reactive-block que espera getVNodeKey
//# sourceMappingURL=reactive.js.map
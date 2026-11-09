/*
 * Copyright (c) 2026 Antonio Johnathan
 * Debug e mismatch - pode ser tree-shaken em prod
 */
import { applyHydrationPayloadToWindow } from "@adaptive-js/shared";
const mismatchLog = new Set();
const mismatchHistory = [];
export function warnMismatch(details) {
    const key = `${details.path}:${details.message}`;
    if (mismatchLog.has(key))
        return;
    mismatchLog.add(key);
    const entry = {
        path: details.path,
        route: readHydrationRoute(),
        message: details.message,
        expected: details.expected,
        found: details.found,
        htmlSnippet: captureNodeSnippet(details.node),
        timestamp: Date.now()
    };
    mismatchHistory.push(entry);
    if (typeof window !== "undefined") {
        window.__ADAPTIVE_HYDRATION_MISMATCHES__ ??= [];
        window.__ADAPTIVE_HYDRATION_MISMATCHES__.push(entry);
    }
    if (isHydrationDebugEnabled()) {
        console.warn("[Adaptive hydration mismatch]", entry);
    }
}
export function warnHydrationInstructionMissing(root, kind, id) {
    warnMismatch({
        path: `hydrate.instruction.${kind}.${id}`,
        message: "Hydration instruction target was not found in existing DOM",
        expected: `[data-aid="${id}"]`,
        found: "nothing",
        node: root instanceof Node ? root : undefined
    });
}
export function getHydrationMismatches() {
    return [...mismatchHistory];
}
export function clearHydrationMismatches() {
    mismatchLog.clear();
    mismatchHistory.length = 0;
    if (typeof window !== "undefined") {
        window.__ADAPTIVE_HYDRATION_MISMATCHES__ = [];
    }
}
function isHydrationDebugEnabled() {
    if (typeof window !== "undefined" && window.__ADAPTIVE_DEBUG_HYDRATION__ === true)
        return true;
    return globalThis?.process?.env?.ADAPTIVE_PUBLIC_DEBUG_HYDRATION === "true";
}
export function debugHydrationLog(...args) {
    if (!isHydrationDebugEnabled())
        return;
    console.log(...args);
}
function readHydrationRoute() {
    if (typeof window === "undefined")
        return "server";
    applyHydrationPayloadToWindow(document);
    return window.__ROUTE__ ?? window.location.pathname;
}
function captureNodeSnippet(node) {
    if (!node)
        return undefined;
    if (node.nodeType === Node.TEXT_NODE)
        return node.textContent ?? "";
    if (node.nodeType === Node.COMMENT_NODE)
        return `<!--${node.textContent ?? ""}-->`;
    if (node.nodeType === Node.ELEMENT_NODE)
        return node.outerHTML.slice(0, 200);
    return undefined;
}
//# sourceMappingURL=mismatch.js.map
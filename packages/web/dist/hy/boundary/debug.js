/*
 * Copyright (c) 2026 Antonio Johnathan
 * Debug helpers - pode ser tree-shaken
 */
export function formatHydrationMismatchReport(config) {
    return `[mismatch] ${config.debugName} ${config.boundaryId ?? ""} ${config.unsupportedFeatures?.join(", ") ?? ""}`;
}
export function dumpBoundaryHtmlForDebug(_) {
    if (globalThis?.process?.env?.ADAPTIVE_PUBLIC_DEBUG_HYDRATION === "true")
        console.warn("[dump]", _.debugName);
}
export function captureBoundaryHtmlSnippet(root, len = 400) {
    return root ? root.outerHTML.slice(0, len) : "";
}
export function captureMismatchSnippet(_) { return null; }
//# sourceMappingURL=debug.js.map
/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
/**
 * Hydration bootstrap via JSON data island (não executa JS).
 * CSP script-src não bloqueia type="application/json".
 */
export const ADAPTIVE_HYDRATION_SCRIPT_ID = "__ADAPTIVE_HYDRATION__";
export function safeJsonForScript(value) {
    return JSON.stringify(value)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}
export function buildHydrationPayloadHtml(payload) {
    const body = safeJsonForScript({
        route: payload.route,
        params: payload.params ?? {},
        query: payload.query ?? {},
    });
    return (`<script type="application/json" id="${ADAPTIVE_HYDRATION_SCRIPT_ID}">` +
        body +
        `</script>`);
}
function defaultBrowserRoot() {
    if (typeof globalThis === "undefined")
        return null;
    const doc = globalThis.document;
    return doc ?? null;
}
export function parseHydrationPayload(root = defaultBrowserRoot()) {
    if (!root)
        return null;
    const el = root.querySelector(`#${ADAPTIVE_HYDRATION_SCRIPT_ID}`);
    if (!el)
        return null;
    try {
        const data = JSON.parse(el.textContent ?? "");
        if (!data || typeof data !== "object")
            return null;
        return {
            route: typeof data.route === "string" ? data.route : "/",
            params: data.params && typeof data.params === "object" && !Array.isArray(data.params)
                ? data.params
                : {},
            query: data.query && typeof data.query === "object" && !Array.isArray(data.query)
                ? data.query
                : {},
        };
    }
    catch {
        return null;
    }
}
export function applyHydrationPayloadToWindow(root = defaultBrowserRoot()) {
    const payload = parseHydrationPayload(root);
    if (!payload)
        return null;
    const win = globalThis.window;
    if (win) {
        win.__ROUTE__ = payload.route;
        win.__PARAMS__ = payload.params;
        win.__QUERYS__ = payload.query;
    }
    return payload;
}
//# sourceMappingURL=hydration-payload.js.map
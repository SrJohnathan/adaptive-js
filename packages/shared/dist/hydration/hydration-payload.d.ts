/**
 * Hydration bootstrap via JSON data island (não executa JS).
 * CSP script-src não bloqueia type="application/json".
 */
export declare const ADAPTIVE_HYDRATION_SCRIPT_ID = "__ADAPTIVE_HYDRATION__";
export interface AdaptiveHydrationPayload {
    route: string;
    params: Record<string, string>;
    query: Record<string, string>;
}
export declare function safeJsonForScript(value: unknown): string;
export declare function buildHydrationPayloadHtml(payload: AdaptiveHydrationPayload): string;
export type HydrationRoot = {
    querySelector(selectors: string): {
        textContent: string | null;
    } | null;
};
export declare function parseHydrationPayload(root?: HydrationRoot | null | undefined): AdaptiveHydrationPayload | null;
export declare function applyHydrationPayloadToWindow(root?: HydrationRoot | null | undefined): AdaptiveHydrationPayload | null;

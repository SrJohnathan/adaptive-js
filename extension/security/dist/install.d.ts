import type { RateLimitStorage, ResolvedSecurityConfig, SecurityEventLike } from "./types.js";
/**
 * Minimal interface that `adapter-nitro` calls when a security plugin is
 * installed. Allows the SSR pipeline to:
 *   1. Obtain a fresh per-request nonce for the hydration `<script>`.
 *   2. Apply security headers (including the nonce in CSP) on every HTML response.
 */
export interface NitroSecurityPlugin {
    /**
     * Called once per SSR render to get a nonce string that will be injected
     * into both `Content-Security-Policy` and the inline hydration `<script>`.
     */
    generateNonce(): string;
    /**
     * Called after the response headers are available. The `nonce` is the
     * same value returned by `generateNonce()` for this request.
     */
    applyHeaders(event: SecurityEventLike, nonce: string): void;
}
/**
 * Installs the security module into a runtime adapter.
 *
 * **Nitro (preferred)** — pass the Nitro app returned by `createNitroApp()`.
 * The module registers `onBeforeResponse` hooks that apply headers and rate
 * limiting automatically.
 *
 * **Bare Node `http.Server`** — pass the server instance directly. The module
 * monkey-patches `server.emit('request', ...)` to add headers on every response.
 *
 * Both paths are best-effort: if the adapter shape is unrecognised, a warning
 * is printed and the function returns without throwing, so the app still boots.
 */
export declare function installSecurity(adapter: unknown, config: ResolvedSecurityConfig, storage: RateLimitStorage): void;
/**
 * Returns a `NitroSecurityPlugin` that `adapter-nitro/handler.ts` can hold a
 * reference to. The handler calls `plugin.generateNonce()` before rendering
 * and passes the nonce to `injectIntoTemplate`, then calls `plugin.applyHeaders`
 * so CSP and the hydration script share the same nonce.
 */
export declare function createNitroSecurityPlugin(config: ResolvedSecurityConfig): NitroSecurityPlugin;

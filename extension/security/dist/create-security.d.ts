import { createNitroSecurityPlugin } from "./install.js";
import type { ApplyHeadersOptions, CreateSecurityOptions, ProtectActionContext, RateLimitContext, RateLimitResult, ResolvedSecurityConfig, SecurityEventLike, SecurityRequestLike } from "./types.js";
export interface SecurityInstance {
    /** The fully-resolved, validated configuration. */
    readonly config: ResolvedSecurityConfig;
    /**
     * Applies all security headers to the response.
     * Pass `options.nonce` to include the same nonce in `Content-Security-Policy`
     * and your inline `<script>` tags.
     */
    applyHeaders(target: SecurityEventLike | {
        setHeader?(name: string, value: string): void;
    }, options?: ApplyHeadersOptions): void;
    /**
     * Evaluates the global rate limit for the incoming request.
     * Attaches `X-RateLimit-*` headers to the response and throws a
     * `SecurityError(RATE_LIMIT_EXCEEDED, 429)` when the limit is exceeded.
     */
    rateLimit(request: SecurityRequestLike | SecurityEventLike, context?: RateLimitContext): Promise<RateLimitResult>;
    /**
     * Full guard for the `/_action` endpoint.
     * Applies per-IP and per-action rate limiting.
     * Throws `SecurityError` on violation.
     */
    protectAction(request: SecurityRequestLike | SecurityEventLike, context?: ProtectActionContext): Promise<void>;
    /**
     * Installs the module into a runtime adapter (Nitro app or Node http.Server).
     * After calling this, headers and rate limiting are applied automatically.
     */
    install(adapter: unknown): void;
    /** Generates a cryptographically random nonce (base64, 16 bytes). */
    generateNonce(): string;
    /**
     * Builds the `Content-Security-Policy` header value, optionally embedding a
     * nonce into `script-src`.
     */
    buildCspHeader(nonce?: string): string;
    /**
     * Returns a `NitroSecurityPlugin` for use by `adapter-nitro/handler.ts`.
     * The handler calls `plugin.generateNonce()` per SSR render and
     * `plugin.applyHeaders(event, nonce)` to keep the nonce consistent
     * between the hydration `<script>` and the CSP header.
     */
    asNitroPlugin(): ReturnType<typeof createNitroSecurityPlugin>;
}
/**
 * Creates a fully configured security instance with secure defaults.
 *
 * ```ts
 * // Minimum viable usage — all defaults applied:
 * export const security = createSecurity();
 *
 * // With explicit allowed origins:
 * export const security = createSecurity({
 *   allowedOrigins: ["https://app.example.com"],
 * });
 * ```
 *
 * Configuration is validated at call time (fail-closed). Passing an invalid
 * `allowedOrigins` entry in production mode throws immediately so misconfiguration
 * is surfaced at boot, not at runtime.
 */
export declare function createSecurity(options?: CreateSecurityOptions): SecurityInstance;

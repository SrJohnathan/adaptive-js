import { protectAction as _protectAction } from "./action-guard.js";
import { buildCspHeader, generateNonce } from "./csp.js";
import { SecurityError } from "./errors.js";
import { applySecurityHeaders } from "./headers.js";
import { createNitroSecurityPlugin, installSecurity } from "./install.js";
import { MemoryRateLimitStorage, applyRateLimitHeaders, evaluateRateLimit } from "./rate-limit.js";
import { extractClientIp, resolveResponseTarget } from "./request.js";
import { resolveSecurityConfig, validateSecurityConfig } from "./defaults.js";
// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
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
export function createSecurity(options = {}) {
    const config = resolveSecurityConfig(options);
    validateSecurityConfig(config);
    // Build a single shared storage instance. In production the developer
    // should provide a Redis-backed store via options.rateLimit.storage.
    const storage = (config.rateLimit && config.rateLimit.storage) ||
        new MemoryRateLimitStorage();
    // ── applyHeaders ──────────────────────────────────────────────────────────
    function applyHeaders(target, headerOptions = {}) {
        applySecurityHeaders(target, config, headerOptions);
    }
    // ── rateLimit ─────────────────────────────────────────────────────────────
    async function rateLimit(request, context = {}) {
        if (!config.rateLimit || config.rateLimit.global === false) {
            // Rate limiting disabled — return a synthetic "always allowed" result.
            return { allowed: true, limit: Infinity, remaining: Infinity, resetAt: 0, retryAfterSeconds: 0 };
        }
        const rule = config.rateLimit.global;
        const ip = context.key ?? extractClientIp(request);
        const key = `global:${ip}`;
        const result = await evaluateRateLimit(key, rule, storage);
        // Best-effort: attach rate limit headers to the response.
        const setter = resolveResponseTarget(request);
        if (setter)
            applyRateLimitHeaders(setter.setHeader, result);
        if (!result.allowed) {
            throw new SecurityError("RATE_LIMIT_EXCEEDED", config.isProduction
                ? "Too many requests."
                : `Global rate limit exceeded (IP: ${ip}).`, 429);
        }
        return result;
    }
    // ── protectAction ─────────────────────────────────────────────────────────
    async function protectAction(request, context = {}) {
        return _protectAction(request, config, storage, context);
    }
    // ── install ───────────────────────────────────────────────────────────────
    function install(adapter) {
        installSecurity(adapter, config, storage);
    }
    // ── buildCspHeader ────────────────────────────────────────────────────────
    function buildCsp(nonce) {
        if (config.csp === false)
            return "";
        return buildCspHeader(config.csp, nonce);
    }
    // ── asNitroPlugin ─────────────────────────────────────────────────────────
    function asNitroPlugin() {
        return createNitroSecurityPlugin(config);
    }
    return {
        config,
        applyHeaders,
        rateLimit,
        protectAction,
        install,
        generateNonce,
        buildCspHeader: buildCsp,
        asNitroPlugin,
    };
}
//# sourceMappingURL=create-security.js.map
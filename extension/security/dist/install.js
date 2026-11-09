import { applySecurityHeaders } from "./headers.js";
import { generateNonce } from "./csp.js";
import { applyRateLimitHeaders, evaluateRateLimit } from "./rate-limit.js";
import { extractClientIp, resolveResponseTarget } from "./request.js";
// ---------------------------------------------------------------------------
// installSecurity — hooks into Nitro or a bare Node http.Server
// ---------------------------------------------------------------------------
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
export function installSecurity(adapter, config, storage) {
    if (!adapter || typeof adapter !== "object")
        return;
    const nitro = adapter;
    // ── Nitro / H3 ────────────────────────────────────────────────────────────
    if (typeof nitro.hooks?.hook === "function") {
        // Headers on every response
        nitro.hooks.hook("afterResponse", (event) => {
            applySecurityHeaders(event, config);
        });
        // Rate limit on every request
        nitro.hooks.hook("request", async (event) => {
            if (!config.rateLimit)
                return;
            const globalRule = config.rateLimit.global;
            if (globalRule === false)
                return;
            const ip = extractClientIp(event);
            const key = `global:${ip}`;
            const result = await evaluateRateLimit(key, globalRule, storage);
            const setter = resolveResponseTarget(event);
            if (setter)
                applyRateLimitHeaders(setter.setHeader, result);
            if (!result.allowed) {
                // Surface as a 429 response directly in Nitro
                const err = Object.assign(new Error("Too many requests."), {
                    statusCode: 429,
                    statusMessage: "Too Many Requests",
                });
                throw err;
            }
        });
        return;
    }
    // ── Bare Node http.Server ─────────────────────────────────────────────────
    if (typeof adapter.on === "function") {
        const server = adapter;
        const wrappedKey = Symbol.for("@adaptive-js/extension-security.installed");
        if (server[wrappedKey])
            return;
        const originalEmit = server.emit;
        server.emit = function (eventName, ...args) {
            if (eventName !== "request") {
                return originalEmit.call(this, eventName, ...args);
            }
            const [req, res] = args;
            void (async () => {
                const responseLike = {
                    setHeader: (name, value) => res.setHeader(name, value),
                };
                const event = {
                    method: req.method,
                    path: req.url,
                    node: { req, res: responseLike },
                };
                applySecurityHeaders(event, config);
                const globalRule = config.rateLimit && config.rateLimit.global;
                if (globalRule) {
                    try {
                        const result = await evaluateRateLimit(`global:${extractClientIp(event)}`, globalRule, storage);
                        applyRateLimitHeaders(responseLike.setHeader, result);
                        if (!result.allowed) {
                            res.writeHead(429, "Too Many Requests");
                            res.end("Too many requests.");
                            return;
                        }
                    }
                    catch {
                        res.writeHead(503, "Service Unavailable");
                        res.end("Security rate limiting is unavailable.");
                        return;
                    }
                }
                originalEmit.call(server, eventName, ...args);
            })();
            return true;
        };
        server[wrappedKey] = true;
        return;
    }
    // ── Unknown adapter ───────────────────────────────────────────────────────
    if (!config.isProduction) {
        console.warn("[AdaptiveJS security] install(): adapter shape not recognised. " +
            "Call applyHeaders() and rateLimit() manually in your request handler.");
    }
}
// ---------------------------------------------------------------------------
// createNitroSecurityPlugin — used by adapter-nitro to wire nonce into SSR
// ---------------------------------------------------------------------------
/**
 * Returns a `NitroSecurityPlugin` that `adapter-nitro/handler.ts` can hold a
 * reference to. The handler calls `plugin.generateNonce()` before rendering
 * and passes the nonce to `injectIntoTemplate`, then calls `plugin.applyHeaders`
 * so CSP and the hydration script share the same nonce.
 */
export function createNitroSecurityPlugin(config) {
    return {
        generateNonce,
        applyHeaders(event, nonce) {
            applySecurityHeaders(event, config, { nonce });
        },
    };
}
//# sourceMappingURL=install.js.map
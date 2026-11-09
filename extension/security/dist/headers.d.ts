import type { ApplyHeadersOptions, ResolvedSecurityConfig, SecurityEventLike, SecurityResponseLike } from "./types.js";
/**
 * Applies all configured security headers to the response.
 *
 * Accepts either a Nitro/H3 event (`SecurityEventLike`) or a plain
 * response-like object (`SecurityResponseLike`). HSTS is only emitted
 * when the request is detected as HTTPS (via `X-Forwarded-Proto` or an
 * explicit `options.isHttps` override).
 */
export declare function applySecurityHeaders(target: SecurityEventLike | SecurityResponseLike, config: ResolvedSecurityConfig, options?: ApplyHeadersOptions): void;

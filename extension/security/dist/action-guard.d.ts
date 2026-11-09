import type { ProtectActionContext, RateLimitStorage, ResolvedSecurityConfig, SecurityEventLike, SecurityRequestLike } from "./types.js";
/**
 * Guards the `/_action` endpoint with rate limiting.
 *
 * The core framework already validates `Origin` and `Content-Type` as
 * baseline protections (see `server-actions-security.md`). This guard
 * adds the layers that are genuinely optional by nature:
 *   - Rate limiting by IP (global pool)
 *   - Rate limiting by IP + action name (action-specific pool)
 *
 * Throws `SecurityError` with status 429 when a limit is exceeded.
 */
export declare function protectAction(request: SecurityRequestLike | SecurityEventLike, config: ResolvedSecurityConfig, storage: RateLimitStorage, context?: ProtectActionContext): Promise<void>;

export function extractClientIp(request) {
    if (!request || typeof request === "string") {
        return null;
    }
    let headers;
    if (request instanceof Headers) {
        headers = request;
    }
    else {
        const possibleRequest = request;
        const requestHeaders = possibleRequest.headers;
        headers = (requestHeaders instanceof Headers ||
            (typeof requestHeaders === "object" && requestHeaders !== null && !Array.isArray(requestHeaders)))
            ? requestHeaders
            : request;
    }
    const getHeader = (name) => {
        if (headers instanceof Headers) {
            return headers.get(name);
        }
        const val = headers[name] ?? headers[name.toLowerCase()] ?? headers[name.toUpperCase()];
        return Array.isArray(val) ? val[0] ?? null : val ?? null;
    };
    const forwardedFor = getHeader("x-forwarded-for");
    if (forwardedFor) {
        const first = forwardedFor.split(",")[0]?.trim();
        if (first)
            return first;
    }
    const realIp = getHeader("x-real-ip") ?? getHeader("cf-connecting-ip");
    if (realIp) {
        return realIp.trim();
    }
    return null;
}
export class MemoryRateLimitStorage {
    entries = new Map();
    cleanupTimer = null;
    constructor(cleanupIntervalMs = 60_000) {
        if (typeof setInterval !== "undefined") {
            this.cleanupTimer = setInterval(() => this.cleanup(), cleanupIntervalMs);
            if (this.cleanupTimer && typeof this.cleanupTimer.unref === "function") {
                this.cleanupTimer.unref();
            }
        }
    }
    increment(key, windowMs) {
        const now = Date.now();
        const existing = this.entries.get(key);
        if (!existing || existing.resetAt <= now) {
            const fresh = { count: 1, resetAt: now + windowMs };
            this.entries.set(key, fresh);
            return fresh;
        }
        existing.count += 1;
        return existing;
    }
    get(key) {
        const now = Date.now();
        const existing = this.entries.get(key);
        if (!existing || existing.resetAt <= now) {
            return null;
        }
        return existing;
    }
    reset(key) {
        this.entries.delete(key);
    }
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.entries) {
            if (entry.resetAt <= now) {
                this.entries.delete(key);
            }
        }
    }
    destroy() {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
            this.cleanupTimer = null;
        }
        this.entries.clear();
    }
}
export const defaultRateLimitStorage = new MemoryRateLimitStorage();
export async function evaluateRateLimit(rule, context) {
    const defaultKeyGen = (ctx) => `${ctx.ip ?? "unknown"}:${ctx.userId ?? "anonymous"}`;
    const key = rule.key ? rule.key(context) : defaultKeyGen(context);
    const storage = rule.storage ?? defaultRateLimitStorage;
    const { count, resetAt } = await storage.increment(key, rule.windowMs);
    const now = Date.now();
    const allowed = count <= rule.max;
    const remaining = Math.max(0, rule.max - count);
    const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - now) / 1000));
    return {
        allowed,
        count,
        limit: rule.max,
        remaining,
        resetAt,
        retryAfterSeconds
    };
}
//# sourceMappingURL=rate-limit.js.map
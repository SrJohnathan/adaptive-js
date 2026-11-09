import type { RateLimitResult, RateLimitRule, RateLimitStorage } from "./types.js";
/**
 * Simple in-memory rate-limit store.
 * Suitable for single-process dev/test; use a Redis-backed store in production
 * multi-instance deployments.
 */
export declare class MemoryRateLimitStorage implements RateLimitStorage {
    private readonly entries;
    private cleanupTimer;
    constructor(cleanupIntervalMs?: number);
    increment(key: string, windowMs: number): {
        count: number;
        resetAt: number;
    };
    /** Returns the current entry without incrementing. */
    peek(key: string): {
        count: number;
        resetAt: number;
    } | null;
    reset(key: string): void;
    cleanup(): void;
    destroy(): void;
}
/**
 * Increments the counter for `key` and evaluates whether the request is
 * within the allowed rate.
 */
export declare function evaluateRateLimit(key: string, rule: RateLimitRule, storage: RateLimitStorage): Promise<RateLimitResult>;
/**
 * Applies rate-limit response headers (`X-RateLimit-*`, `Retry-After`)
 * so clients can implement back-off without parsing error bodies.
 */
export declare function applyRateLimitHeaders(setHeader: (name: string, value: string) => void, result: RateLimitResult): void;

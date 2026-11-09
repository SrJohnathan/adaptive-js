import type { AuthRateLimitRule, AuthRateLimitStorage, AuthRequestLike, AuthUser, RateLimitContext } from "./types.js";
export interface RateLimitEvaluation {
    allowed: boolean;
    count: number;
    limit: number;
    remaining: number;
    resetAt: number;
    retryAfterSeconds: number;
}
export declare function extractClientIp(request?: AuthRequestLike | Headers | Record<string, string | string[] | undefined> | string): string | null;
export declare class MemoryRateLimitStorage implements AuthRateLimitStorage {
    private readonly entries;
    private cleanupTimer;
    constructor(cleanupIntervalMs?: number);
    increment(key: string, windowMs: number): {
        count: number;
        resetAt: number;
    };
    get(key: string): {
        count: number;
        resetAt: number;
    } | null;
    reset(key: string): void;
    cleanup(): void;
    destroy(): void;
}
export declare const defaultRateLimitStorage: MemoryRateLimitStorage;
export declare function evaluateRateLimit<TUser extends AuthUser = AuthUser>(rule: AuthRateLimitRule<TUser>, context: RateLimitContext<TUser>): Promise<RateLimitEvaluation>;

import type { SecurityEventLike, SecurityRequestLike } from "./types.js";
export declare function normalizeSecurityRequest(input?: SecurityRequestLike | SecurityEventLike | Headers | Record<string, string | string[] | undefined>): SecurityRequestLike;
export declare function getRequestHeader(headers: Headers | Record<string, string | string[] | undefined> | undefined, name: string): string | null;
export declare function extractClientIp(request?: SecurityRequestLike | SecurityEventLike | Headers | Record<string, string | string[] | undefined>): string;
export declare function isHttpsRequest(request?: SecurityRequestLike | SecurityEventLike): boolean;
export declare function resolveResponseTarget(target: SecurityEventLike | {
    setHeader?: (name: string, value: string) => void;
}): {
    setHeader(name: string, value: string): void;
} | null;

import type { HstsOptions } from "./types.js";
/**
 * Builds the value for the `Strict-Transport-Security` header.
 * Returns `null` when hsts is disabled.
 */
export declare function buildHstsHeader(options: HstsOptions): string;
/**
 * Applies `Strict-Transport-Security`. Only emits the header when
 * `isHttps` is true — sending HSTS over plain HTTP would lock users
 * out of non-HTTPS origins without benefit.
 */
export declare function applyHsts(setHeader: (name: string, value: string) => void, options: HstsOptions | false, isHttps: boolean): void;

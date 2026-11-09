import type { FrameguardOption } from "./types.js";
/**
 * Builds the value for the `X-Frame-Options` header.
 * Returns `null` when frameguard is disabled (`false`).
 */
export declare function buildFrameguardHeader(option: FrameguardOption): string | null;
/**
 * Applies `X-Frame-Options` to a raw setter function.
 */
export declare function applyFrameguard(setHeader: (name: string, value: string) => void, option: FrameguardOption): void;

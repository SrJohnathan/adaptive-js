import type { PermissionsPolicyOptions } from "./types.js";
/**
 * Builds the `Permissions-Policy` header value from a record of
 * feature → allowlist entries.
 *
 * @example
 * buildPermissionsPolicyHeader({ camera: [], microphone: [], geolocation: [] })
 * // → "camera=(), microphone=(), geolocation=()"
 *
 * @example
 * buildPermissionsPolicyHeader({ fullscreen: ["self"] })
 * // → "fullscreen=(self)"
 */
export declare function buildPermissionsPolicyHeader(options: PermissionsPolicyOptions): string;
/**
 * Applies `Permissions-Policy` to the response.
 * No-ops when `options` is `false` or empty.
 */
export declare function applyPermissionsPolicy(setHeader: (name: string, value: string) => void, options: PermissionsPolicyOptions | false): void;

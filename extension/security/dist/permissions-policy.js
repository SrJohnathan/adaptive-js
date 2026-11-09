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
export function buildPermissionsPolicyHeader(options) {
    return Object.entries(options)
        .map(([feature, allowlist]) => {
        if (!allowlist.length) {
            return `${feature}=()`;
        }
        const origins = allowlist
            .map((origin) => (origin === "self" || origin === "'self'" ? "self" : `"${origin}"`))
            .join(" ");
        return `${feature}=(${origins})`;
    })
        .join(", ");
}
/**
 * Applies `Permissions-Policy` to the response.
 * No-ops when `options` is `false` or empty.
 */
export function applyPermissionsPolicy(setHeader, options) {
    if (options === false)
        return;
    const value = buildPermissionsPolicyHeader(options);
    if (value) {
        setHeader("Permissions-Policy", value);
    }
}
//# sourceMappingURL=permissions-policy.js.map
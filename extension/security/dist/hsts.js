/**
 * Builds the value for the `Strict-Transport-Security` header.
 * Returns `null` when hsts is disabled.
 */
export function buildHstsHeader(options) {
    const maxAge = options.maxAge ?? 31_536_000;
    let value = `max-age=${maxAge}`;
    if (options.includeSubDomains !== false) {
        value += "; includeSubDomains";
    }
    if (options.preload) {
        value += "; preload";
    }
    return value;
}
/**
 * Applies `Strict-Transport-Security`. Only emits the header when
 * `isHttps` is true — sending HSTS over plain HTTP would lock users
 * out of non-HTTPS origins without benefit.
 */
export function applyHsts(setHeader, options, isHttps) {
    if (options === false || !isHttps)
        return;
    setHeader("Strict-Transport-Security", buildHstsHeader(options));
}
//# sourceMappingURL=hsts.js.map
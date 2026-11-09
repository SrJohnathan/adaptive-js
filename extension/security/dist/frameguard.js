/**
 * Builds the value for the `X-Frame-Options` header.
 * Returns `null` when frameguard is disabled (`false`).
 */
export function buildFrameguardHeader(option) {
    if (option === false)
        return null;
    return option === "sameorigin" ? "SAMEORIGIN" : "DENY";
}
/**
 * Applies `X-Frame-Options` to a raw setter function.
 */
export function applyFrameguard(setHeader, option) {
    const value = buildFrameguardHeader(option);
    if (value !== null) {
        setHeader("X-Frame-Options", value);
    }
}
//# sourceMappingURL=frameguard.js.map
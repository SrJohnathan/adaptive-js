/**
 * Validates a post-login return path. Only same-origin relative paths are allowed.
 */
export function sanitizeReturnTo(value, options = {}) {
    if (!value || typeof value !== "string") {
        return null;
    }
    const maxLength = options.maxLength ?? 2048;
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > maxLength) {
        return null;
    }
    if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
        return null;
    }
    if (trimmed.includes("://") || trimmed.includes("\\")) {
        return null;
    }
    try {
        const decoded = decodeURIComponent(trimmed);
        if (decoded !== trimmed && !decoded.startsWith("/")) {
            return null;
        }
        if (decoded.startsWith("//") || decoded.includes("://") || decoded.includes("\\")) {
            return null;
        }
    }
    catch {
        return null;
    }
    return trimmed;
}
/**
 * Builds a login URL with a safe internal return path query parameter.
 */
export function buildLoginReturnUrl(loginPath, returnTo, options = {}) {
    const safeReturnTo = sanitizeReturnTo(returnTo, options);
    if (!safeReturnTo) {
        return loginPath;
    }
    const paramName = options.paramName ?? "returnTo";
    const separator = loginPath.includes("?") ? "&" : "?";
    return `${loginPath}${separator}${paramName}=${encodeURIComponent(safeReturnTo)}`;
}
/**
 * Reads and validates a return path from request search params.
 */
export function readReturnToFromSearchParams(searchParams, options = {}) {
    const paramName = options.paramName ?? "returnTo";
    const raw = searchParams instanceof URLSearchParams
        ? searchParams.get(paramName)
        : searchParams[paramName] ?? null;
    return sanitizeReturnTo(raw, options);
}
//# sourceMappingURL=intended-url.js.map
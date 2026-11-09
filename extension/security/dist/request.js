export function normalizeSecurityRequest(input) {
    if (!input)
        return {};
    if (input instanceof Headers) {
        return { headers: input };
    }
    if ("node" in input || "req" in input || "res" in input) {
        const event = input;
        return {
            headers: event.req?.headers ??
                event.node?.req?.headers ??
                event.headers,
            method: event.method ?? event.req?.method ?? event.node?.req?.method,
            url: event.path ?? event.req?.url ?? event.node?.req?.url,
            remoteAddress: event.req?.remoteAddress ??
                event.node?.req?.socket?.remoteAddress ??
                event.req?.socket?.remoteAddress ??
                event.context?.clientAddress,
        };
    }
    if ("headers" in input || "method" in input || "url" in input) {
        const request = input;
        return {
            ...request,
            remoteAddress: request.remoteAddress ?? input.socket?.remoteAddress,
        };
    }
    return { headers: input };
}
export function getRequestHeader(headers, name) {
    if (!headers)
        return null;
    if (headers instanceof Headers) {
        return headers.get(name);
    }
    const val = headers[name] ??
        headers[name.toLowerCase()] ??
        headers[name.toUpperCase()];
    return Array.isArray(val) ? val[0] ?? null : val ?? null;
}
export function extractClientIp(request) {
    const normalized = normalizeSecurityRequest(request);
    return normalized.remoteAddress?.trim() || "unknown";
}
export function isHttpsRequest(request) {
    const normalized = normalizeSecurityRequest(request);
    const forwardedProto = getRequestHeader(normalized.headers, "x-forwarded-proto");
    if (forwardedProto) {
        return forwardedProto.split(",")[0]?.trim().toLowerCase() === "https";
    }
    const url = normalized.url;
    if (url) {
        try {
            return new URL(url, "http://localhost").protocol === "https:";
        }
        catch {
            return false;
        }
    }
    return false;
}
export function resolveResponseTarget(target) {
    const event = target;
    if (typeof event.setHeader === "function") {
        return { setHeader: (name, value) => event.setHeader(name, value) };
    }
    if (event.node?.res?.setHeader) {
        return { setHeader: (name, value) => event.node.res.setHeader(name, value) };
    }
    if (event.res?.headers?.set) {
        return {
            setHeader: (name, value) => event.res.headers.set(name, value),
        };
    }
    return null;
}
//# sourceMappingURL=request.js.map
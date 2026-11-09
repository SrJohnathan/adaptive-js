/*
 * Copyright (c) 2026 Antonio Johnathan
 * Serialização de props client -> comentário
 */
function serializeValue(value, seen) {
    if (value == null || typeof value === "string" || typeof value === "number" || typeof value === "boolean")
        return value;
    if (typeof value === "bigint")
        return { __adaptive_type: "bigint", value: value.toString() };
    if (value instanceof Date)
        return { __adaptive_type: "date", value: value.toISOString() };
    if (Array.isArray(value))
        return value.map((i) => serializeValue(i, seen));
    if (typeof value === "function" || typeof value === "symbol")
        return { __adaptive_type: "unsupported", value: typeof value };
    if (typeof value === "object") {
        if (seen.has(value))
            return { __adaptive_type: "circular" };
        seen.add(value);
        const out = {};
        for (const [k, v] of Object.entries(value)) {
            if (k === "ref")
                continue;
            const sanitized = serializeValue(v, seen);
            if (sanitized !== undefined)
                out[k] = sanitized;
        }
        seen.delete(value);
        return out;
    }
    return undefined;
}
function reviveValue(value) {
    if (Array.isArray(value))
        return value.map((i) => reviveValue(i));
    if (!value || typeof value !== "object")
        return value;
    if (value.__adaptive_type === "date")
        return new Date(value.value);
    if (value.__adaptive_type === "bigint")
        return BigInt(value.value);
    if (value.__adaptive_type === "unsupported" || value.__adaptive_type === "circular")
        return undefined;
    const out = {};
    for (const [k, v] of Object.entries(value)) {
        const revived = reviveValue(v);
        if (revived !== undefined)
            out[k] = revived;
    }
    return out;
}
export function serializeClientProps(props) {
    return JSON.stringify(serializeValue(props, new WeakSet()));
}
export function stripChildrenFromProps(props) {
    if (!("children" in props))
        return props;
    const next = { ...props };
    delete next.children;
    return next;
}
export function parseClientProps(raw) {
    // "null" faz JSON.parse devolver null, e o chamador faz props.children = ...
    // em seguida: devolver {} mantem o contrato de objeto.
    try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? reviveValue(parsed) : {};
    }
    catch {
        return {};
    }
}
//# sourceMappingURL=props-serialization.js.map
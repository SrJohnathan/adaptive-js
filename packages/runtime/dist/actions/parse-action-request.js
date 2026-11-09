/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
const PATH_SEGMENT = /([^[\]]+)|\[(\d+)\]/g;
function parseKeyPath(key) {
    const segments = [];
    for (const match of key.matchAll(PATH_SEGMENT)) {
        segments.push(match[1] ?? match[2] ?? "");
    }
    return segments;
}
function ensureContainer(parent, key, nextKey) {
    const isNextNumeric = nextKey !== undefined && /^\d+$/.test(nextKey);
    const target = parent[key];
    if (target && typeof target === "object") {
        return target;
    }
    const created = isNextNumeric ? [] : {};
    parent[key] = created;
    return created;
}
/**
 * Normaliza qualquer entrada (FormData nativo ou partes manuais)
 * para um iterável unificado de [key, value].
 */
function extractFormDataEntries(parts) {
    if (parts instanceof FormData) {
        return Array.from(parts.entries());
    }
    const entries = [];
    for (const part of parts) {
        if (!part.name)
            continue;
        entries.push([part.name, partValue(part)]);
    }
    return entries;
}
function partValue(part) {
    if (part.filename) {
        // .slice() garante que o buffer retornado seja um ArrayBuffer padrão compatível com BlobPart
        const safeBuffer = new Uint8Array(part.data);
        return new File([safeBuffer], part.filename, {
            type: part.type ?? "application/octet-stream",
        });
    }
    return new TextDecoder().decode(part.data);
}
function singleFormDataArg(parts) {
    if (parts instanceof FormData) {
        return parts;
    }
    const formData = new FormData();
    for (const part of parts) {
        if (!part.name)
            continue;
        formData.append(part.name, partValue(part));
    }
    return formData;
}
function structuredArgs(parts) {
    const entries = extractFormDataEntries(parts);
    const root = {};
    for (const [name, value] of entries) {
        const segments = parseKeyPath(name);
        if (segments.length === 0 || segments[0] !== "args")
            continue;
        let cursor = root;
        for (let i = 0; i < segments.length - 1; i++) {
            const currentSeg = segments[i];
            const nextSeg = segments[i + 1];
            cursor = ensureContainer(cursor, currentSeg, nextSeg);
        }
        cursor[segments[segments.length - 1]] = value;
    }
    const args = root.args;
    if (!Array.isArray(args))
        return args === undefined ? [] : [args];
    return args;
}
/** h3 v2 entrega Headers; outros adapters entregam objeto comum. */
export function getActionHeader(headers, name) {
    if (!headers)
        return null;
    if (typeof headers.get === "function") {
        return headers.get(name);
    }
    const record = headers;
    const value = record[name] ?? record[name.toLowerCase()] ?? record[name.toUpperCase()];
    return Array.isArray(value) ? value[0] ?? null : value ?? null;
}
export function parseActionCallRequest(options) {
    const { headers, body, parts } = options;
    const json = (body ?? {});
    const moduleId = getActionHeader(headers, "x-adaptive-module") ??
        (typeof json.module === "string" ? json.module : undefined) ??
        "actions/index";
    const actionName = getActionHeader(headers, "x-adaptive-action") ??
        (typeof json.action === "string" ? json.action : "") ??
        "";
    const argsMode = getActionHeader(headers, "x-adaptive-args-mode") ?? "json";
    let args;
    if (argsMode === "formdata-single") {
        args = [singleFormDataArg(parts ?? new FormData())];
    }
    else if (argsMode === "structured") {
        args = structuredArgs(parts ?? []);
    }
    else if (Array.isArray(json.args)) {
        args = json.args;
    }
    else if (json.input !== undefined) {
        args = [json.input];
    }
    else {
        args = [];
    }
    return { moduleId, actionName, args };
}
//# sourceMappingURL=parse-action-request.js.map
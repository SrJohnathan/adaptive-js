/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

export type ActionMultipartPart = {
    data: Uint8Array;
    name?: string;
    filename?: string;
    type?: string;
};

export type ActionCallRequest = {
    moduleId: string;
    actionName: string;
    args: unknown[];
};

const PATH_SEGMENT = /([^[\]]+)|\[(\d+)\]/g;

function parseKeyPath(key: string): string[] {
    const segments: string[] = [];
    for (const match of key.matchAll(PATH_SEGMENT)) {
        segments.push(match[1] ?? match[2] ?? "");
    }
    return segments;
}

function ensureContainer(parent: any, key: string, nextKey?: string): any {
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
function extractFormDataEntries(parts: FormData | ActionMultipartPart[]): Array<[string, FormDataEntryValue]> {
    if (parts instanceof FormData) {
        return Array.from(parts.entries());
    }

    const entries: Array<[string, FormDataEntryValue]> = [];
    for (const part of parts) {
        if (!part.name) continue;
        entries.push([part.name, partValue(part)]);
    }
    return entries;
}

function partValue(part: ActionMultipartPart): FormDataEntryValue {
    if (part.filename) {
        // .slice() garante que o buffer retornado seja um ArrayBuffer padrão compatível com BlobPart
        const safeBuffer = new Uint8Array(part.data);
        return new File([safeBuffer], part.filename, {
            type: part.type ?? "application/octet-stream",
        });
    }
    return new TextDecoder().decode(part.data);
}

function singleFormDataArg(parts: FormData | ActionMultipartPart[]): FormData {
    if (parts instanceof FormData) {
        return parts;
    }
    const formData = new FormData();
    for (const part of parts) {
        if (!part.name) continue;
        formData.append(part.name, partValue(part));
    }
    return formData;
}

function structuredArgs(parts: FormData | ActionMultipartPart[]): unknown[] {
    const entries = extractFormDataEntries(parts);
    const root: Record<string, unknown> = {};

    for (const [name, value] of entries) {
        const segments = parseKeyPath(name);
        if (segments.length === 0 || segments[0] !== "args") continue;

        let cursor: any = root;
        for (let i = 0; i < segments.length - 1; i++) {
            const currentSeg = segments[i];
            const nextSeg = segments[i + 1];
            cursor = ensureContainer(cursor, currentSeg, nextSeg);
        }
        cursor[segments[segments.length - 1]] = value;
    }

    const args = root.args;
    if (!Array.isArray(args)) return args === undefined ? [] : [args];
    return args;
}

/** h3 v2 entrega Headers; outros adapters entregam objeto comum. */
export function getActionHeader(
    headers: Headers | Record<string, string | string[] | undefined> | undefined,
    name: string,
): string | null {
    if (!headers) return null;
    if (typeof (headers as Headers).get === "function") {
        return (headers as Headers).get(name);
    }
    const record = headers as Record<string, string | string[] | undefined>;
    const value = record[name] ?? record[name.toLowerCase()] ?? record[name.toUpperCase()];
    return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

export function parseActionCallRequest(options: {
    headers?: Headers | Record<string, string | string[] | undefined>;
    body?: unknown;
    parts?: FormData | ActionMultipartPart[];
}): ActionCallRequest {
    const { headers, body, parts } = options;
    const json = (body ?? {}) as Record<string, unknown>;

    const moduleId =
        getActionHeader(headers, "x-adaptive-module") ??
        (typeof json.module === "string" ? json.module : undefined) ??
        "actions/index";

    const actionName =
        getActionHeader(headers, "x-adaptive-action") ??
        (typeof json.action === "string" ? json.action : "") ??
        "";

    const argsMode = getActionHeader(headers, "x-adaptive-args-mode") ?? "json";

    let args: unknown[];
    if (argsMode === "formdata-single") {
        args = [singleFormDataArg(parts ?? new FormData())];
    } else if (argsMode === "structured") {
        args = structuredArgs(parts ?? []);
    } else if (Array.isArray(json.args)) {
        args = json.args;
    } else if (json.input !== undefined) {
        args = [json.input];
    } else {
        args = [];
    }

    return { moduleId, actionName, args };
}
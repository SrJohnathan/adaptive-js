/*
 *
 *  * Copyright (c) 2026 Antonio Johnathan
 *  *
 *  * Licensed under the MIT License.
 *  * See LICENSE file in the project root for full license information.
 *
 */

import { getClientComponentMetadata } from "@adaptive-js/shared";
import { describeCollectedOrigin } from "./collect.js";

export interface CollectedRow {
    key: string;
    kind: "event" | "dynamic-prop" | "reactive" | "ref";
    detail: string;
    origin: string;
}

export interface HydrationTraceEntry {
    /** performance.now() no momento da decisão */
    at: number;
    readyState: DocumentReadyState;
    debugName: string;
    boundaryId?: string;
    variant: "root" | "markers";
    /** mode do componente raiz segundo o metadata ("client" | "hydrate" | null) */
    rootMode: string | null;
    manifestFound: boolean;
    collectedCount: number;
    /** lista COMPLETA, sem o corte do relatório */
    unsupportedFeatures: string[];
    manifest: unknown;
    collected: CollectedRow[];
    stack?: string;
}

declare global {
    interface Window {
        __ADAPTIVE_HYDRATION_TRACE__?: HydrationTraceEntry[];
    }
}

/** Uma linha por binding coletado no client, na ordem em que a coleta andou. */
export function summarizeCollected(collected: any): CollectedRow[] {
    const origin = (key: string) => describeCollectedOrigin(collected, key) ?? "(sem origem)";
    const rows: CollectedRow[] = [];
    for (const [key, v] of collected.events ?? []) rows.push({ key, kind: "event", detail: v.event, origin: origin(key) });
    for (const [key, v] of collected.dynamicProps ?? []) rows.push({ key, kind: "dynamic-prop", detail: v.prop, origin: origin(key) });
    for (const [key] of collected.reactive ?? []) rows.push({ key, kind: "reactive", detail: "", origin: origin(key) });
    for (const [key] of collected.refs ?? []) rows.push({ key, kind: "ref", detail: "", origin: origin(key) });
    return rows;
}

export function traceHydrationMismatch(input: {
    debugName: string;
    boundaryId?: string;
    component?: unknown;
    manifest: unknown;
    collected: any;
    unsupportedFeatures: string[];
    variant: "root" | "markers";
}): HydrationTraceEntry | undefined {
    if (typeof window === "undefined") return;

    const rows = summarizeCollected(input.collected);
    const entry: HydrationTraceEntry = {
        at: Math.round(performance.now()),
        readyState: document.readyState,
        debugName: input.debugName,
        boundaryId: input.boundaryId,
        variant: input.variant,
        rootMode:
            typeof input.component === "function"
                ? ((getClientComponentMetadata(input.component as any) as any)?.mode ?? null)
                : null,
        manifestFound: input.manifest != null,
        collectedCount: rows.length,
        unsupportedFeatures: [...input.unsupportedFeatures],
        manifest: input.manifest,
        collected: rows,
        stack: new Error("hydration mismatch").stack,
    };

    const log = (window.__ADAPTIVE_HYDRATION_TRACE__ ??= []);
    log.push(entry);
    if (log.length > 50) log.shift();

    console.groupCollapsed(
        `[Adaptive Hydration] ${entry.debugName} (${entry.boundaryId ?? "?"}) — ` +
        `${entry.unsupportedFeatures.length} divergências, ${entry.collectedCount} bindings coletados no client`,
    );
    console.log("rootMode:", entry.rootMode, "| manifest encontrado:", entry.manifestFound,
        "| readyState:", entry.readyState, "| t =", entry.at, "ms");
    console.log("divergências (completas):", entry.unsupportedFeatures);
    console.log("coletado no client:");
    console.table(rows);
    console.log("manifest vindo do server:", input.manifest);
    console.log(entry.stack);
    console.groupEnd();

    return entry;
}
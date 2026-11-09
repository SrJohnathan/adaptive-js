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
/** Uma linha por binding coletado no client, na ordem em que a coleta andou. */
export function summarizeCollected(collected) {
    const origin = (key) => describeCollectedOrigin(collected, key) ?? "(sem origem)";
    const rows = [];
    for (const [key, v] of collected.events ?? [])
        rows.push({ key, kind: "event", detail: v.event, origin: origin(key) });
    for (const [key, v] of collected.dynamicProps ?? [])
        rows.push({ key, kind: "dynamic-prop", detail: v.prop, origin: origin(key) });
    for (const [key] of collected.reactive ?? [])
        rows.push({ key, kind: "reactive", detail: "", origin: origin(key) });
    for (const [key] of collected.refs ?? [])
        rows.push({ key, kind: "ref", detail: "", origin: origin(key) });
    return rows;
}
export function traceHydrationMismatch(input) {
    if (typeof window === "undefined")
        return;
    const rows = summarizeCollected(input.collected);
    const entry = {
        at: Math.round(performance.now()),
        readyState: document.readyState,
        debugName: input.debugName,
        boundaryId: input.boundaryId,
        variant: input.variant,
        rootMode: typeof input.component === "function"
            ? (getClientComponentMetadata(input.component)?.mode ?? null)
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
    if (log.length > 50)
        log.shift();
    console.groupCollapsed(`[Adaptive Hydration] ${entry.debugName} (${entry.boundaryId ?? "?"}) — ` +
        `${entry.unsupportedFeatures.length} divergências, ${entry.collectedCount} bindings coletados no client`);
    console.log("rootMode:", entry.rootMode, "| manifest encontrado:", entry.manifestFound, "| readyState:", entry.readyState, "| t =", entry.at, "ms");
    console.log("divergências (completas):", entry.unsupportedFeatures);
    console.log("coletado no client:");
    console.table(rows);
    console.log("manifest vindo do server:", input.manifest);
    console.log(entry.stack);
    console.groupEnd();
    return entry;
}
//# sourceMappingURL=hydration-trace.js.map
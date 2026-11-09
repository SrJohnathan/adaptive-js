/*
 * Copyright (c) 2026 Antonio Johnathan
 * Hidratação de boundary existente - DOM-first, sem VDOM
 */
import { applyHydrationInstructions, applyHydrationInstructionsBetweenMarkers } from "../hydrate/instructions.js";
import { cleanupAdaptiveMarkersAfterSuccess, cleanupAdaptiveMarkersAfterSuccessBetweenMarkers } from "../hydrate/cleanup.js";
import { readHydrationManifestBetweenMarkers, readHydrationManifestFromRoot } from "./discovery.js";
import { collectHydrationBindings } from "./collect.js";
import { bindHydrationManifest } from "./bind.js";
import { collectSiblingNodesBetween } from "../hydrate/markers.js";
import { formatHydrationMismatchReport, dumpBoundaryHtmlForDebug, captureBoundaryHtmlSnippet, captureMismatchSnippet } from "./debug.js";
import { boundaryHydrationNotices } from "./registry.js";
import { flushEvents } from "../../reactive/index.js";
import { traceHydrationMismatch } from "./hydration-trace.js";
function getBoundaryDebugName(Component) { return Component?.name || "anonymous"; }
function onlyUnlocatableFeatures(features) {
    return features.length > 0 && features.every((f) => f.includes(":extra:"));
}
function recordBoundaryHydrationNotice(debugName, report, snippet) {
    const key = `${debugName}:${snippet.slice(0, 80)}`;
    if (boundaryHydrationNotices.has(key))
        return;
    boundaryHydrationNotices.add(key);
    console.warn(`[Adaptive Hydration] mismatch in ${debugName}\n${report}\n${snippet}`);
}
function adoptExistingBoundary(config) {
    const nodes = config.snapshot();
    if (config.unsupportedFeatures.length > 0) {
        const report = formatHydrationMismatchReport({ debugName: config.debugName, boundaryId: config.boundaryId, unsupportedFeatures: config.unsupportedFeatures });
        const mismatch = captureMismatchSnippet({ nodes, unsupportedFeatures: config.unsupportedFeatures });
        const rootElement = nodes.find((n) => n.nodeType === 1);
        const snippet = mismatch ? `[data-aid="${mismatch.targetId}"] ${mismatch.domPath}\n${mismatch.html}` : onlyUnlocatableFeatures(config.unsupportedFeatures) ? `[sem data-aid]` : `[raiz ${config.boundaryId ?? "?"}]\n${captureBoundaryHtmlSnippet(rootElement, 400)}`;
        recordBoundaryHydrationNotice(config.debugName, report, snippet);
        dumpBoundaryHtmlForDebug({ debugName: config.debugName, boundaryId: config.boundaryId, report, nodes });
    }
    return nodes;
}
function isEmptyCollect(c) {
    return c.events.size === 0 && c.refs.size === 0 && c.reactive.size === 0 &&
        c.dynamicProps.size === 0 && c.effects.length === 0 && c.layoutEffects.length === 0;
}
export function hydrateExistingBoundary(root, config) {
    const manifestRecord = readHydrationManifestFromRoot(root, config.boundaryId);
    const collected = collectHydrationBindings(config.component, config.props, config.boundaryId);
    const bound = manifestRecord
        ? bindHydrationManifest(manifestRecord.manifest, collected)
        : isEmptyCollect(collected)
            ? { instructions: [], unsupportedFeatures: [] } // <- estático, ok
            : { instructions: [], unsupportedFeatures: ["manifest:missing"] };
    const instructions = config.instructions ?? bound.instructions;
    if (bound.unsupportedFeatures.length === 0) {
        applyHydrationInstructions(root, instructions);
        flushEvents();
        manifestRecord?.script.remove();
        cleanupAdaptiveMarkersAfterSuccess(root);
        return Array.from(root.childNodes);
    }
    traceHydrationMismatch({
        debugName: config.debugName, boundaryId: config.boundaryId,
        component: config.component, manifest: manifestRecord?.manifest ?? null,
        collected, unsupportedFeatures: bound.unsupportedFeatures,
        variant: "root", // "markers" no BetweenMarkers
    });
    const res = adoptExistingBoundary({ debugName: config.debugName, instructions, unsupportedFeatures: bound.unsupportedFeatures, snapshot: () => Array.from(root.childNodes) });
    queueMicrotask(() => { cleanupAdaptiveMarkersAfterSuccess(root); });
    return res;
}
export function hydrateExistingBoundaryBetweenMarkers(start, end, config) {
    const manifestRecord = readHydrationManifestBetweenMarkers(start, end, config.boundaryId);
    const collected = collectHydrationBindings(config.component, config.props, config.boundaryId);
    const bound = manifestRecord
        ? bindHydrationManifest(manifestRecord.manifest, collected)
        : isEmptyCollect(collected)
            ? { instructions: [], unsupportedFeatures: [] }
            : { instructions: [], unsupportedFeatures: ["manifest:missing"] };
    const instructions = config.instructions ?? bound.instructions;
    if (bound.unsupportedFeatures.length === 0) {
        applyHydrationInstructionsBetweenMarkers(start, end, instructions);
        flushEvents();
        manifestRecord?.script.remove();
        return cleanupAdaptiveMarkersAfterSuccessBetweenMarkers(start, end);
    }
    traceHydrationMismatch({
        debugName: config.debugName, boundaryId: config.boundaryId,
        component: config.component, manifest: manifestRecord?.manifest ?? null,
        collected, unsupportedFeatures: bound.unsupportedFeatures,
        variant: "root", // "markers" no BetweenMarkers
    });
    const res = adoptExistingBoundary({ debugName: config.debugName, instructions, unsupportedFeatures: bound.unsupportedFeatures, snapshot: () => collectSiblingNodesBetween(start, end) });
    queueMicrotask(() => { cleanupAdaptiveMarkersAfterSuccessBetweenMarkers(start, end); });
    return res;
}
export function hydrateExistingComponent(root, Component, props, boundaryId = "") {
    return hydrateExistingBoundary(root, { debugName: getBoundaryDebugName(Component), component: Component, props, boundaryId });
}
export function hydrateExistingComponentBetweenMarkers(start, end, Component, props, boundaryId = "") {
    return hydrateExistingBoundaryBetweenMarkers(start, end, { debugName: getBoundaryDebugName(Component), component: Component, props, boundaryId });
}
//# sourceMappingURL=hydrate.js.map
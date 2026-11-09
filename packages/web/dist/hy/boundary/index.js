/*
 * Copyright (c) 2026 Antonio Johnathan
 * Entry de boundaries - sem VDOM
 */
import { collectSiblingNodesBetween } from "../hydrate/markers.js";
import { reportHydrationError } from "../hydrate/mismatch.js";
import { createElement } from "@adaptive-js/core";
import { mountClientComponent, mountClientComponentBetweenMarkers } from "./mount.js";
import { hydrateExistingComponent, hydrateExistingComponentBetweenMarkers } from "./hydrate.js";
import { findCommentBoundaries } from "./discovery.js";
import { parseClientProps } from "./props-serialization.js";
import { clientBoundaryScopes, mountedClientBoundaries, registeredHydrationModules, resetMountedBoundaries, cleanupDisconnectedClientComponentScopes } from "./registry.js";
import { cleanupClientBoundaryAttributes, cssEscape } from "./cleanup.js";
import { CLIENT_BOUNDARY_MODE_CLIENT, CLIENT_BOUNDARY_MODE_HYDRATE, HYDRATE_SLOT_TAG, HYDRATION_BOUNDARY_ID_ATTR } from "@adaptive-js/shared";
import { cleanupEventsScope, isSSR, runWithEffectScope } from "../../reactive/index.js";
import { cleanupHandlerScope, createHandlerScope, runWithHandlerScope } from "../../front/handler-scope.js";
import { createEventsScope } from "../../reactive/events.js";
import { useRouter } from "../../front/router.js";
export { createBoundaryComponent, isClientComponent } from "./factory.js";
export { describeCollectedOrigin } from "./collect.js";
export function hydrateClientComponents(moduleId, exportsMap) {
    if (typeof document === "undefined")
        return;
    registeredHydrationModules.set(moduleId, exportsMap);
    if (!isSSR())
        useRouter().init();
    runWhenDomReady(() => hydrateSafely(moduleId, exportsMap));
}
function hydrateSafely(moduleId, exportsMap) {
    try {
        hydrateClientComponentsNow(moduleId, exportsMap);
    }
    catch (err) {
        // Uma ilha que lança deixa o HTML do servidor na tela e nada mais: sem isto
        // a falha some no console e a página parece estar funcionando.
        reportHydrationError(err, { moduleId });
    }
}
export function wrapHydratePropsForServer(props) {
    if (!("children" in props)) {
        return props;
    }
    const children = Array.isArray(props.children)
        ? props.children
        : props.children == null
            ? []
            : [props.children];
    return {
        ...props,
        children: createElement(HYDRATE_SLOT_TAG, { children })
    };
}
if (!isSSR()) {
    window.addEventListener("adaptive:routechange", () => {
        resetMountedBoundaries();
        runWhenDomReady(() => {
            for (const [moduleId, exportsMap] of registeredHydrationModules.entries()) {
                try {
                    hydrateClientComponentsNow(moduleId, exportsMap);
                }
                catch (err) {
                    reportHydrationError(err, { moduleId });
                }
            }
        });
    });
}
function runWhenDomReady(cb) {
    if (document.readyState === "loading")
        document.addEventListener("DOMContentLoaded", cb, { once: true });
    else
        cb();
}
function hydrateClientComponentsNow(moduleId, exportsMap) {
    cleanupDisconnectedClientComponentScopes();
    const commentBoundaries = findCommentBoundaries(moduleId);
    commentBoundaries.forEach((boundary) => {
        if (mountedClientBoundaries.has(boundary.start))
            return;
        const Component = exportsMap[boundary.exportName];
        if (typeof Component !== "function")
            return;
        const props = boundary.rawProps ? parseClientProps(boundary.rawProps) : {};
        if (boundary.hasChildren) {
            props.children = boundary.mode === "hydrate" ? createElement(HYDRATE_SLOT_TAG, { hydrate: true }) : collectSiblingNodesBetween(boundary.start, boundary.end);
        }
        const prev = clientBoundaryScopes.get(boundary.start);
        if (prev) {
            cleanupEventsScope(prev.scope);
            cleanupHandlerScope(prev.handlerScope);
        }
        const nextScope = createEventsScope(`client:${moduleId}:${boundary.exportName}`);
        const nextHandlerScope = createHandlerScope(`handler:${moduleId}:${boundary.exportName}`);
        mountedClientBoundaries.add(boundary.start);
        let mountedNodes = [];
        mountedNodes = runWithEffectScope(nextScope, () => runWithHandlerScope(nextHandlerScope, () => {
            if (boundary.mode === CLIENT_BOUNDARY_MODE_CLIENT)
                return mountClientComponentBetweenMarkers(boundary.start, boundary.end, Component, props);
            if (boundary.mode === CLIENT_BOUNDARY_MODE_HYDRATE)
                return hydrateExistingComponentBetweenMarkers(boundary.start, boundary.end, Component, props, boundary.boundaryId);
            return [];
        }));
        clientBoundaryScopes.set(boundary.start, {
            scope: nextScope, handlerScope: nextHandlerScope,
            isConnected: () => mountedNodes.length > 0 ? mountedNodes.some((n) => n.isConnected) : Boolean(document.body?.isConnected),
            isWithin: (container) => mountedNodes.length > 0 ? mountedNodes.some((n) => container.contains(n)) : true
        });
    });
    const nodes = document.querySelectorAll(`[data-adaptive-client-module="${cssEscape(moduleId)}"]`);
    nodes.forEach((node) => {
        if (mountedClientBoundaries.has(node))
            return;
        const exportName = node.dataset.adaptiveClientExport || "default";
        const mode = node.dataset.adaptiveClientMode || "client";
        const boundaryId = node.getAttribute(HYDRATION_BOUNDARY_ID_ATTR) ?? "";
        const Component = exportsMap[exportName];
        if (typeof Component !== "function")
            return;
        const rawProps = node.dataset.adaptiveClientProps;
        const props = rawProps ? parseClientProps(rawProps) : {};
        if (node.dataset.adaptiveClientHasChildren === "true") {
            props.children = mode === "hydrate" ? createElement(HYDRATE_SLOT_TAG, { hydrate: true }) : Array.from(node.childNodes);
        }
        const prev = clientBoundaryScopes.get(node);
        if (prev) {
            cleanupEventsScope(prev.scope);
            cleanupHandlerScope(prev.handlerScope);
        }
        mountedClientBoundaries.add(node);
        const nextHandlerScope = createHandlerScope(`handler:${moduleId}:${exportName}`);
        const nextScope = createEventsScope(`client:${moduleId}:${exportName}`);
        const mountedNodes = runWithEffectScope(nextScope, () => runWithHandlerScope(nextHandlerScope, () => {
            if (mode === CLIENT_BOUNDARY_MODE_CLIENT)
                return mountClientComponent(node, Component, props);
            if (mode === CLIENT_BOUNDARY_MODE_HYDRATE)
                return hydrateExistingComponent(node, Component, props, boundaryId);
            return [];
        }));
        clientBoundaryScopes.set(node, {
            scope: nextScope, handlerScope: nextHandlerScope,
            isConnected: () => mountedNodes.length > 0 ? mountedNodes.some((c) => c.isConnected) : node.isConnected,
            isWithin: (container) => mountedNodes.length > 0 ? mountedNodes.some((c) => container.contains(c)) : container.contains(node)
        });
        cleanupClientBoundaryAttributes(node);
    });
}
//# sourceMappingURL=index.js.map
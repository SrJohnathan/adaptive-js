/*
 * Copyright (c) 2026 Antonio Johnathan
 * Descoberta de boundaries no DOM - TreeWalker sem VDOM
 */
import { findMatchingMarkerEnd } from "../hydrate/markers.js";
import { CLIENT_BOUNDARY_END, CLIENT_BOUNDARY_START_PREFIX, HYDRATION_BOUNDARY_ID_ATTR, HYDRATION_MANIFEST_ATTR } from "@adaptive-js/shared";
export function findCommentBoundaries(moduleId) {
    const boundaries = [];
    const walker = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT);
    const stack = [];
    let current = walker.nextNode();
    while (current) {
        const comment = current;
        const content = comment.data ?? "";
        if (content.startsWith(CLIENT_BOUNDARY_START_PREFIX)) {
            const payload = decodeCommentPayload(content.slice(CLIENT_BOUNDARY_START_PREFIX.length));
            if (payload)
                stack.push({ start: comment, mode: payload.mode, moduleId: payload.moduleId, exportName: payload.exportName, rawProps: payload.rawProps, hasChildren: payload.hasChildren, boundaryId: payload.boundaryId });
        }
        else if (content === CLIENT_BOUNDARY_END) {
            const boundary = stack.pop();
            if (boundary && boundary.moduleId === moduleId)
                boundaries.push({ ...boundary, end: comment });
        }
        current = walker.nextNode();
    }
    return boundaries;
}
export function decodeCommentPayload(raw) {
    try {
        return JSON.parse(decodeURIComponent(raw));
    }
    catch {
        return null;
    }
}
export function readHydrationManifestFromRoot(root, boundaryId = "") {
    let current = root.firstChild;
    while (current) {
        if (current.nodeType === Node.COMMENT_NODE && current.data.startsWith(CLIENT_BOUNDARY_START_PREFIX)) {
            current = skipNestedBoundary(current, root, root);
            continue;
        }
        if (current.nodeType === Node.ELEMENT_NODE && current.tagName === "SCRIPT" && current.hasAttribute(HYDRATION_MANIFEST_ATTR)) {
            const script = current;
            const candidate = script.getAttribute(HYDRATION_BOUNDARY_ID_ATTR) ?? "";
            if (!boundaryId || candidate === boundaryId) {
                const manifest = parseHydrationManifest(script.textContent ?? "");
                if (manifest)
                    return { script, manifest };
            }
        }
        current = current.nextSibling;
    }
    return null;
}
export function readHydrationManifestBetweenMarkers(start, end, boundaryId = "") {
    let current = start.nextSibling;
    const parent = start.parentNode;
    while (current && current !== end) {
        if (current.nodeType === Node.COMMENT_NODE && current.data.startsWith(CLIENT_BOUNDARY_START_PREFIX)) {
            current = skipNestedBoundary(current, parent, end);
            continue;
        }
        if (current.nodeType === Node.ELEMENT_NODE && current.tagName === "SCRIPT" && current.hasAttribute(HYDRATION_MANIFEST_ATTR)) {
            const script = current;
            const candidate = script.getAttribute(HYDRATION_BOUNDARY_ID_ATTR) ?? "";
            if (!boundaryId || candidate === boundaryId) {
                const manifest = parseHydrationManifest(script.textContent ?? "");
                if (manifest)
                    return { script, manifest };
            }
        }
        current = current.nextSibling;
    }
    return null;
}
export function parseHydrationManifest(raw) {
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function skipNestedBoundary(current, parent, end) {
    const boundaryEnd = findMatchingMarkerEnd(parent, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
    return boundaryEnd ? boundaryEnd.nextSibling : end;
}
//# sourceMappingURL=discovery.js.map
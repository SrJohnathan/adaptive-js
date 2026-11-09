/*
 * Copyright (c) 2026 Antonio Johnathan
 * Busca genérica de pares de comentários reativos
 */
import { CLIENT_BOUNDARY_END, CLIENT_BOUNDARY_START_PREFIX } from "../hydration/client-boundary.js";
import { findMatchingMarkerEnd, isClientBoundaryStartComment } from "./markers.js";
export function findMarkerPairInRoot(root, startMarker, endMarker) {
    let rangeStart = null;
    let rangeEnd = null;
    function search(node) {
        let current = node.firstChild;
        while (current) {
            if (isClientBoundaryStartComment(current)) {
                const boundaryEnd = findMatchingMarkerEnd(node, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
                current = boundaryEnd ? boundaryEnd.nextSibling : current.nextSibling;
                continue;
            }
            if (current.nodeType === Node.COMMENT_NODE) {
                const data = current.data;
                if (data === startMarker)
                    rangeStart = current;
                else if (data === endMarker) {
                    rangeEnd = current;
                    if (rangeStart)
                        return true;
                }
            }
            else if (current.nodeType === Node.ELEMENT_NODE) {
                const el = current;
                if (!el.hasAttribute("data-adaptive-client-module")) {
                    if (search(el))
                        return true;
                }
            }
            current = current.nextSibling;
        }
        return false;
    }
    search(root);
    return { start: rangeStart, end: rangeEnd };
}
export function findMarkerPairBetweenMarkers(start, end, startMarker, endMarker) {
    const parent = start.parentNode;
    if (!parent)
        return { start: null, end: null };
    let rangeStart = null;
    let rangeEnd = null;
    function searchInElement(element) {
        let current = element.firstChild;
        while (current) {
            if (isClientBoundaryStartComment(current)) {
                const boundaryEnd = findMatchingMarkerEnd(element, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
                current = boundaryEnd ? boundaryEnd.nextSibling : null;
                continue;
            }
            if (current.nodeType === Node.ELEMENT_NODE) {
                const child = current;
                if (!child.hasAttribute("data-adaptive-client-module")) {
                    if (searchInElement(child))
                        return true;
                }
            }
            else if (current.nodeType === Node.COMMENT_NODE) {
                const data = current.data;
                if (data === startMarker)
                    rangeStart = current;
                else if (data === endMarker) {
                    rangeEnd = current;
                    if (rangeStart)
                        return true;
                }
            }
            current = current.nextSibling;
        }
        return false;
    }
    let current = start.nextSibling;
    while (current && current !== end) {
        if (isClientBoundaryStartComment(current)) {
            const boundaryEnd = findMatchingMarkerEnd(parent, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
            current = boundaryEnd ? boundaryEnd.nextSibling : end;
            continue;
        }
        if (current.nodeType === Node.COMMENT_NODE) {
            const data = current.data;
            if (data === startMarker)
                rangeStart = current;
            else if (data === endMarker) {
                rangeEnd = current;
                if (rangeStart)
                    break;
            }
        }
        else if (current.nodeType === Node.ELEMENT_NODE) {
            const el = current;
            if (!el.hasAttribute("data-adaptive-client-module")) {
                if (searchInElement(el))
                    break;
            }
        }
        current = current.nextSibling;
    }
    return { start: rangeStart, end: rangeEnd };
}
//# sourceMappingURL=reactive-markers.js.map
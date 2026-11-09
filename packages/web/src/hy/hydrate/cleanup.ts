/*
 * Copyright (c) 2026 Antonio Johnathan
 */

import { collectSiblingNodesBetween, findMatchingMarkerEnd, isAdaptiveBoundaryComment, isClientBoundaryStartComment, isSafeToRemoveAdaptiveComment } from "./markers.js";
import {CLIENT_BOUNDARY_END, CLIENT_BOUNDARY_START_PREFIX} from "@adaptive-js/shared";

export function cleanupAdaptiveMarkersAfterSuccess(root: ParentNode): void {
  cleanupAdaptiveMarkersInNode(root, { boundaryRoot: root });
}

function cleanupAdaptiveMarkersInNode(root: ParentNode, opts?: { boundaryRoot?: ParentNode }) {
  let current = root.firstChild;
  while (current) {
    const next = current.nextSibling;
    if (isClientBoundaryStartComment(current)) {
      const end = findMatchingMarkerEnd(root as Node, current as Comment, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
      current = end ? end.nextSibling : next;
      continue;
    }
    if (current.nodeType === Node.COMMENT_NODE && isSafeToRemoveAdaptiveComment(current)) {
      current.remove();
    } else if (current.nodeType === Node.ELEMENT_NODE || current.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      cleanupAdaptiveMarkersInNode(current as Element | DocumentFragment, opts);
    }
    current = next;
  }
}

export function cleanupAdaptiveMarkersAfterSuccessBetweenMarkers(start: Comment, end: Comment): Node[] {
  const retained = collectSiblingNodesBetween(start, end).filter((n) => n.nodeType !== Node.COMMENT_NODE);
  retained.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      cleanupAdaptiveMarkersInNode(node as ParentNode);
    }
  });
  let current: Node | null = start.nextSibling;
  while (current && current !== end) {
    const next = current.nextSibling;
    if (isClientBoundaryStartComment(current)) {
      const boundaryEnd = findMatchingMarkerEnd(start.parentNode as Node, current as Comment, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
      current = boundaryEnd ? boundaryEnd.nextSibling : next;
      continue;
    }
    if (isSafeToRemoveAdaptiveComment(current)) current.remove();
    current = next;
  }
  if (isAdaptiveBoundaryComment(start)) start.remove();
  if (isAdaptiveBoundaryComment(end)) end.remove();
  return retained.filter((n) => n.isConnected);
}

export function debugHydrationMarkers(root: ParentNode) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
  let node: Comment | null;
  while ((node = walker.nextNode() as Comment | null)) {
    const data = node.data.trim();
    if (data.startsWith("adaptive-") || data.startsWith("adaptive:")) console.log("[HYDRATION MARKER]", data);
  }
}

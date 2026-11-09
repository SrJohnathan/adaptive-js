/*
 * Copyright (c) 2026 Antonio Johnathan
 * Busca de elementos por data-aid - sem VDOM, só DOM walk
 */

import { HYDRATION_ATTR } from "./constants.js";
import { findMatchingMarkerEnd, isClientBoundaryStartComment } from "./markers.js";
import {CLIENT_BOUNDARY_END, CLIENT_BOUNDARY_START_PREFIX} from "@adaptive-js/shared";

export function findHydrationElement(root: ParentNode, id: string): Element | null {
  if (root instanceof Element && root.getAttribute(HYDRATION_ATTR) === id) return root;
  return findHydrationElementInSubtree(root, id, root);
}

export function findHydrationElementBetweenMarkers(start: Comment, end: Comment, id: string): Element | null {
  let current = start.nextSibling;
  while (current && current !== end) {
    if (isClientBoundaryStartComment(current)) {
      const boundaryEnd = findMatchingMarkerEnd(start.parentNode as Node, current as Comment, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
      current = boundaryEnd ? boundaryEnd.nextSibling : end;
      continue;
    }
    if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as Element;
      if (el.getAttribute(HYDRATION_ATTR) === id) return el;
      if (!el.hasAttribute("data-adaptive-client-module")) {
        const nested = findHydrationElementInSubtree(el, id, el);
        if (nested) return nested;
      }
    }
    current = current.nextSibling;
  }
  return null;
}

function findHydrationElementInSubtree(root: ParentNode, id: string, boundaryRoot: ParentNode): Element | null {
  let current = root.firstChild;
  while (current) {
    if (isClientBoundaryStartComment(current)) {
      const boundaryEnd = findMatchingMarkerEnd(root as Node, current as Comment, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
      current = boundaryEnd ? boundaryEnd.nextSibling : current.nextSibling;
      continue;
    }
    if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as Element;
      if (el.getAttribute(HYDRATION_ATTR) === id) return el;
      if (el.hasAttribute("data-adaptive-client-module") && el !== boundaryRoot) {
        current = current.nextSibling;
        continue;
      }
      const nested = findHydrationElementInSubtree(el, id, boundaryRoot);
      if (nested) return nested;
    }
    current = current.nextSibling;
  }
  return null;
}

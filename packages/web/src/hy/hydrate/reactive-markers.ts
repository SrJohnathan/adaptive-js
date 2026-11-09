/*
 * Copyright (c) 2026 Antonio Johnathan
 * Busca genérica de pares de comentários reativos
 */

import { findMatchingMarkerEnd, isClientBoundaryStartComment } from "./markers.js";
import {CLIENT_BOUNDARY_END, CLIENT_BOUNDARY_START_PREFIX} from "@adaptive-js/shared";

export function findMarkerPairInRoot(root: ParentNode, startMarker: string, endMarker: string) {
  let rangeStart: Comment | null = null;
  let rangeEnd: Comment | null = null;

  function search(node: ParentNode): boolean {
    let current = node.firstChild;
    while (current) {
      if (isClientBoundaryStartComment(current)) {
        const boundaryEnd = findMatchingMarkerEnd(node as Node, current as Comment, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
        current = boundaryEnd ? boundaryEnd.nextSibling : current.nextSibling;
        continue;
      }
      if (current.nodeType === Node.COMMENT_NODE) {
        const data = (current as Comment).data;
        if (data === startMarker) rangeStart = current as Comment;
        else if (data === endMarker) {
          rangeEnd = current as Comment;
          if (rangeStart) return true;
        }
      } else if (current.nodeType === Node.ELEMENT_NODE) {
        const el = current as Element;
        if (!el.hasAttribute("data-adaptive-client-module")) {
          if (search(el)) return true;
        }
      }
      current = current.nextSibling;
    }
    return false;
  }

  search(root);
  return { start: rangeStart, end: rangeEnd };
}

export function findMarkerPairBetweenMarkers(start: Comment, end: Comment, startMarker: string, endMarker: string) {
  const parent = start.parentNode;
  if (!parent) return { start: null as Comment | null, end: null as Comment | null };

  let rangeStart: Comment | null = null;
  let rangeEnd: Comment | null = null;

  function searchInElement(element: Element): boolean {
    let current: Node | null = element.firstChild;
    while (current) {
      if (isClientBoundaryStartComment(current)) {
        const boundaryEnd = findMatchingMarkerEnd(element, current as Comment, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
        current = boundaryEnd ? boundaryEnd.nextSibling : null;
        continue;
      }
      if (current.nodeType === Node.ELEMENT_NODE) {
        const child = current as Element;
        if (!child.hasAttribute("data-adaptive-client-module")) {
          if (searchInElement(child)) return true;
        }
      } else if (current.nodeType === Node.COMMENT_NODE) {
        const data = (current as Comment).data;
        if (data === startMarker) rangeStart = current as Comment;
        else if (data === endMarker) {
          rangeEnd = current as Comment;
          if (rangeStart) return true;
        }
      }
      current = current.nextSibling;
    }
    return false;
  }

  let current: Node | null = start.nextSibling;
  while (current && current !== end) {
    if (isClientBoundaryStartComment(current)) {
      const boundaryEnd = findMatchingMarkerEnd(parent, current as Comment, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
      current = boundaryEnd ? boundaryEnd.nextSibling : end;
      continue;
    }
    if (current.nodeType === Node.COMMENT_NODE) {
      const data = (current as Comment).data;
      if (data === startMarker) rangeStart = current as Comment;
      else if (data === endMarker) {
        rangeEnd = current as Comment;
        if (rangeStart) break;
      }
    } else if (current.nodeType === Node.ELEMENT_NODE) {
      const el = current as Element;
      if (!el.hasAttribute("data-adaptive-client-module")) {
        if (searchInElement(el)) break;
      }
    }
    current = current.nextSibling;
  }

  return { start: rangeStart, end: rangeEnd };
}

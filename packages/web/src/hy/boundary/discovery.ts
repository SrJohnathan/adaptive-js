/*
 * Copyright (c) 2026 Antonio Johnathan
 * Descoberta de boundaries no DOM - TreeWalker sem VDOM
 */

import { findMatchingMarkerEnd } from "../hydrate/markers.js";
import {
  CLIENT_BOUNDARY_END,
  CLIENT_BOUNDARY_START_PREFIX,
  HYDRATION_BOUNDARY_ID_ATTR,
  HYDRATION_MANIFEST_ATTR, HydrationManifest
} from "@adaptive-js/shared";

export function findCommentBoundaries(moduleId: string) {
  const boundaries: Array<{ start: Comment; end: Comment; mode: string; moduleId: string; exportName: string; rawProps: string; hasChildren: boolean; boundaryId: string; }> = [];
  const walker = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT);
  const stack: Array<{ start: Comment; mode: string; moduleId: string; exportName: string; rawProps: string; hasChildren: boolean; boundaryId: string; }> = [];
  let current = walker.nextNode();
  while (current) {
    const comment = current as Comment;
    const content = comment.data ?? "";
    if (content.startsWith(CLIENT_BOUNDARY_START_PREFIX)) {
      const payload = decodeCommentPayload(content.slice(CLIENT_BOUNDARY_START_PREFIX.length));
      if (payload) stack.push({ start: comment, mode: payload.mode, moduleId: payload.moduleId, exportName: payload.exportName, rawProps: payload.rawProps, hasChildren: payload.hasChildren, boundaryId: payload.boundaryId });
    } else if (content === CLIENT_BOUNDARY_END) {
      const boundary = stack.pop();
      if (boundary && boundary.moduleId === moduleId) boundaries.push({ ...boundary, end: comment });
    }
    current = walker.nextNode();
  }
  return boundaries;
}

export function decodeCommentPayload(raw: string) {
  try {
    return JSON.parse(decodeURIComponent(raw)) as { mode: string; moduleId: string; exportName: string; rawProps: string; hasChildren: boolean; boundaryId: string; };
  } catch { return null; }
}

export function readHydrationManifestFromRoot(root: HTMLElement, boundaryId = "") {
  let current: Node | null = root.firstChild;
  while (current) {
    if (current.nodeType === Node.COMMENT_NODE && (current as Comment).data.startsWith(CLIENT_BOUNDARY_START_PREFIX)) {
      current = skipNestedBoundary(current as Comment, root, root);
      continue;
    }
    if (current.nodeType === Node.ELEMENT_NODE && (current as Element).tagName === "SCRIPT" && (current as Element).hasAttribute(HYDRATION_MANIFEST_ATTR)) {
      const script = current as HTMLScriptElement;
      const candidate = script.getAttribute(HYDRATION_BOUNDARY_ID_ATTR) ?? "";
      if (!boundaryId || candidate === boundaryId) {
        const manifest = parseHydrationManifest(script.textContent ?? "");
        if (manifest) return { script, manifest };
      }
    }
    current = current.nextSibling;
  }
  return null;
}

export function readHydrationManifestBetweenMarkers(start: Comment, end: Comment, boundaryId = "") {
  let current: Node | null = start.nextSibling;
  const parent = start.parentNode as Node;
  while (current && current !== end) {
    if (current.nodeType === Node.COMMENT_NODE && (current as Comment).data.startsWith(CLIENT_BOUNDARY_START_PREFIX)) {
      current = skipNestedBoundary(current as Comment, parent, end);
      continue;
    }
    if (current.nodeType === Node.ELEMENT_NODE && (current as Element).tagName === "SCRIPT" && (current as Element).hasAttribute(HYDRATION_MANIFEST_ATTR)) {
      const script = current as HTMLScriptElement;
      const candidate = script.getAttribute(HYDRATION_BOUNDARY_ID_ATTR) ?? "";
      if (!boundaryId || candidate === boundaryId) {
        const manifest = parseHydrationManifest(script.textContent ?? "");
        if (manifest) return { script, manifest };
      }
    }
    current = current.nextSibling;
  }
  return null;
}

export function parseHydrationManifest(raw: string): HydrationManifest | null {
  try { return JSON.parse(raw) as HydrationManifest; } catch { return null; }
}

export function skipNestedBoundary(current: Comment, parent: Node, end: Node) {
  const boundaryEnd = findMatchingMarkerEnd(parent, current, CLIENT_BOUNDARY_START_PREFIX, CLIENT_BOUNDARY_END);
  return boundaryEnd ? boundaryEnd.nextSibling : end;
}

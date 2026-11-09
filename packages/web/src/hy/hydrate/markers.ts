/*
 * Copyright (c) 2026 Antonio Johnathan
 * Marker utils - busca de comentários <!--adaptive-*-->
 */


import {CLIENT_BOUNDARY_START_PREFIX} from "@adaptive-js/shared";

export function isClientBoundaryStartComment(node: Node): node is Comment {
  return node.nodeType === Node.COMMENT_NODE && (node as Comment).data.startsWith(CLIENT_BOUNDARY_START_PREFIX);
}

export function isAdaptiveBoundaryComment(node: Node): node is Comment {
  if (node.nodeType !== Node.COMMENT_NODE) return false;
  const d = (node as Comment).data;
  return d.startsWith("adaptive-") || d.startsWith(CLIENT_BOUNDARY_START_PREFIX);
}

export function isSafeToRemoveAdaptiveComment(node: Node): node is Comment {
  if (node.nodeType !== Node.COMMENT_NODE) return false;
  const d = (node as Comment).data;
  
  // NEVER remove reactive anchor comments - they are managed by the registry
  if (d.startsWith("adaptive-reactive-anchor-")) return false;
  
  // mantém client boundaries e hydrate slots - só remove reactive markers se recover
  return d.startsWith("adaptive-reactive-") || d.startsWith("adaptive-struct-") || d.startsWith("adaptive-list-") || d.startsWith("adaptive-async-") || d.startsWith("adaptive-empty");
}

export function findMatchingMarkerEnd(root: Node, start: Comment, startPrefix: string, endText: string): Comment | null {
  let depth = 0;
  let current: Node | null = start.nextSibling;
  while (current) {
    if (current.nodeType === Node.COMMENT_NODE) {
      const data = (current as Comment).data;
      if (data.startsWith(startPrefix)) depth++;
      else if (data === endText) {
        if (depth === 0) return current as Comment;
        depth--;
      }
    }
    // não atravessa para fora do root se root for elemento
    if (current === root) break;
    current = current.nextSibling;
    // se root é ParentNode, continuamos dentro dele apenas
    if (root instanceof Element && current && !root.contains(current) && current !== root.nextSibling) {
      // se saiu do root, para
      // mas como buscamos só siblings do start dentro do mesmo parent, não precisamos checar contains complexo
    }
  }
  return null;
}

export function collectSiblingNodesBetween(start: Node, end: Node): Node[] {
  const nodes: Node[] = [];
  let cur = start.nextSibling;
  while (cur && cur !== end) {
    nodes.push(cur);
    cur = cur.nextSibling;
  }
  return nodes;
}

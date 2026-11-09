/*
 * Copyright (c) 2026 Antonio Johnathan
 * Normalização de children e props
 */

export function getVNodeChildren(node: any): any[] {
  const c = node?.children ?? node?.props?.children;
  if (c == null) return [];
  return Array.isArray(c) ? c : [c];
}

export function resolveComponentProps(node: any) {
  const props = { ...(node.props ?? {}) };
  const children = getVNodeChildren(node);
  if (children.length > 0) {
    props.children = children.length === 1 ? children[0] : children;
  }
  return props;
}

export function safePreview(fn: () => any) {
  try { return fn(); } catch { return ""; }
}

/*
 * Copyright (c) 2026 Antonio Johnathan
 */
export function cleanupClientBoundaryAttributes(node: HTMLElement) {
  node.removeAttribute("data-adaptive-client-mode");
  node.removeAttribute("data-adaptive-client-module");
  node.removeAttribute("data-adaptive-client-export");
  node.removeAttribute("data-adaptive-client-props");
  node.removeAttribute("data-adaptive-client-has-children");
  node.removeAttribute("data-adaptive-client-mounted");
}
export function cssEscape(value: string) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
  return value.replace(/["\\]/g, "\\$&");
}

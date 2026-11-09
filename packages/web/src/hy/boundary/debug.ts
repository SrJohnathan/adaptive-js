/*
 * Copyright (c) 2026 Antonio Johnathan
 * Debug helpers - pode ser tree-shaken
 */
export function formatHydrationMismatchReport(config: any): string {
  return `[mismatch] ${config.debugName} ${config.boundaryId ?? ""} ${config.unsupportedFeatures?.join(", ") ?? ""}`;
}
export function dumpBoundaryHtmlForDebug(_: any) {
  if ((globalThis as any)?.process?.env?.ADAPTIVE_PUBLIC_DEBUG_HYDRATION === "true") console.warn("[dump]", _.debugName);
}
export function captureBoundaryHtmlSnippet(root?: Element, len = 400) {
  return root ? root.outerHTML.slice(0, len) : "";
}
export function captureMismatchSnippet(_: any): { targetId: string; domPath: string; html: string } | null { return null; }

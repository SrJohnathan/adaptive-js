/*
 * Copyright (c) 2026 Antonio Johnathan
 * Manifest de hidratação fina - data-aid, eventos, refs, props dinâmicas
 */

import {
  HYDRATION_BOUNDARY_ID_ATTR,
  HYDRATION_MANIFEST_ATTR,
  type HydrationManifestInstruction
} from "@adaptive-js/shared";
import { isSupportedDynamicHydrationPropName } from "@adaptive-js/shared";
import { escapeAttr, escapeScriptJson } from "./escape.js";
import type { RenderContext } from "./types.js";

export function nextKey(context: RenderContext, kind: "event" | "ref" | "reactive" | "dynamicProp") {
  const c = context.hydrateInstructionCounters;
  if (!c) return "";
  const v = c[kind]++;
  return kind === "event" ? `e${v}` : kind === "ref" ? `f${v}` : kind === "reactive" ? `rx${v}` : `p${v}`;
}

export function maybeAllocateHydrationId(props: Record<string, any>, context: RenderContext) {
  if (!context.hydrateAidCounter) return null;
  if (props["data-aid"] != null) return String(props["data-aid"]);

  const needs = Object.entries(props).some(([k, v]) => {
    if (k === "children" || k === "key") return false;
    if (k === "ref") return v != null;
    if (k.startsWith("on")) return typeof v === "function";
    return typeof v === "function" && isSupportedDynamicHydrationPropName(k);
  });

  if (!needs) return null;
  const id = context.hydrateAidCounter.value++;
  return context.currentBoundaryId ? `${context.currentBoundaryId}:${id}` : String(id);
}

export function appendManifestForProps(props: Record<string, any>, id: string, context: RenderContext) {
  if (!context.hydrateManifest) return;
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith("on") && typeof value === "function") {
      context.hydrateManifest.push({ key: nextKey(context, "event"), kind: "event", id, event: key.slice(2).toLowerCase() });
    } else if (key === "ref" && value != null) {
      context.hydrateManifest.push({ key: nextKey(context, "ref"), kind: "ref", id });
    } else if (key !== "children" && typeof value === "function" && isSupportedDynamicHydrationPropName(key)) {
      context.hydrateManifest.push({ key: nextKey(context, "dynamicProp"), kind: "dynamic-prop", id, prop: key });
    }
  }
}

export function renderManifest(boundaryId: string, instructions: HydrationManifestInstruction[]) {
  const payload = escapeScriptJson(JSON.stringify({ boundaryId, instructions }));
  return `<script type="application/json" ${HYDRATION_MANIFEST_ATTR}="true" ${HYDRATION_BOUNDARY_ID_ATTR}="${escapeAttr(boundaryId)}">${payload}</script>`;
}

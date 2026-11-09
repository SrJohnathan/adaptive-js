/*
 * Copyright (c) 2026 Antonio Johnathan
 * Core SSR - renderNode é o único que conhece a árvore toda
 */

import { CONTEXT_PROVIDER_TAG, getClientComponentMetadata, runWithServerContext } from "@adaptive-js/shared";
import { isClientBoundaryTag, isHydrateSlotTag } from "@adaptive-js/shared";
import { CLIENT_BOUNDARY_MODE_CLIENT } from "@adaptive-js/shared";
import { FRAGMENT, SELF_CLOSING_TAGS, SVG_TAGS, SVG_ATTRIBUTE_NAME_MAP } from "./constants.js";
import { escapeAttr, escapeHtml } from "./escape.js";
import { serializeStyleLike } from "@adaptive-js/shared";
import { getVNodeChildren, resolveComponentProps, safePreview } from "./children.js";
import { resolveReactiveMarkerPair, resolveManifestKind, resolvePreview } from "./reactive.js";
import { maybeAllocateHydrationId, appendManifestForProps, nextKey } from "./hydration.js";
import { renderClientBoundary, renderHydrateSlot } from "./boundaries.js";
import type { RenderContext } from "./types.js";

export function renderToString(node: any): string {
  // O contador precisa existir mesmo sem metadata: sem ele todo boundary
  // hydrate sai com boundaryId "b0" e o client nao distingue as ilhas.
  return renderNode(node, { hydrateBoundaryCounter: { value: 0 } });
}

export function renderToStringWithMetadata(node: any): { html: string; clientModuleIds: string[] } {
  const context: RenderContext = {
    clientModuleIds: new Set<string>(),
    hydrateBoundaryCounter: { value: 0 }
  };
  return {
    html: renderNode(node, context),
    clientModuleIds: Array.from(context.clientModuleIds ?? [])
  };
}

export function renderNode(node: any, context: RenderContext): string {
  // thunk reativo - hidratação fina
  if (typeof node === "function") {
    const preview = safePreview(node);
    const localId = context.hydrateReactiveCounter ? String(context.hydrateReactiveCounter.value++) : null;
    const reactiveId = localId && context.currentBoundaryId ? `${context.currentBoundaryId}:${localId}` : localId;
    const marker = resolveReactiveMarkerPair(preview);

    if (context.hydrateManifest && reactiveId) {
      context.hydrateManifest.push({
        key: nextKey(context, "reactive"),
        kind: resolveManifestKind(marker.start),
        id: reactiveId
      });
    }

    const start = reactiveId ? `${marker.start}:${reactiveId}` : marker.start;
    const end = reactiveId ? `${marker.end}:${reactiveId}` : marker.end;
    const innerCtx = { ...context, hydrateManifest: undefined, hydrateInstructionCounters: undefined, hydrateAidCounter: undefined };
    return `<!--${start}-->${renderNode(resolvePreview(preview), innerCtx)}<!--${end}-->`;
  }

  if (node == null || node === false || node === true) return "";
  if (typeof node === "string" || typeof node === "number") return escapeHtml(String(node));
  if (Array.isArray(node)) return node.map((c) => renderNode(c, context)).join("");

  if (node.tag === CONTEXT_PROVIDER_TAG) {
    return runWithServerContext(node.props.context.id, node.props.value, () => renderNode(node.children ?? [], context));
  }

  if (typeof node.tag === "function") {
    const meta = getClientComponentMetadata?.(node.tag) ?? null;
    const result = node.tag(resolveComponentProps(node));
    if (meta?.mode === CLIENT_BOUNDARY_MODE_CLIENT || meta?.mode === "client") {
      return renderNode(result, {
        ...context,
        hydrateManifest: undefined,
        hydrateInstructionCounters: undefined,
        hydrateAidCounter: undefined,
        hydrateReactiveCounter: undefined
      });
    }
    return renderNode(result, context);
  }

  if (isHydrateSlotTag(node.tag)) return renderHydrateSlot(node, context);
  if (isClientBoundaryTag(node.tag)) return renderClientBoundary(node, context);
  if (node.tag === FRAGMENT || node.tag === "Fragment" || typeof node.tag === "symbol") {
    return renderNode(getVNodeChildren(node), context);
  }

  const { tag, props = {} } = node;
  const children = getVNodeChildren(node);
  const isSvg = SVG_TAGS.has(tag);

  let propsString = "";
  const hydrateId = maybeAllocateHydrationId(props, context);
  if (hydrateId && props["data-aid"] == null) {
    propsString += ` data-aid="${escapeAttr(hydrateId)}"`;
    appendManifestForProps(props, hydrateId, context);
  }

  for (const [key, value] of Object.entries(props)) {
    if (key === "children" || key === "key" || key === "ref" || value == null || key === "data-aid") continue;
    if (key.startsWith("on") && typeof value === "function") continue;

    const attr = isSvg ? (SVG_ATTRIBUTE_NAME_MAP[key] ?? key) : key === "className" ? "class" : key;

    if (key === "style") {
      const s = serializeStyleLike(value as any);
      if (s) propsString += ` style="${escapeAttr(s)}"`;
      continue;
    }

    const resolved = typeof value === "function" ? safePreview(value as any) : value;
    if (resolved == null || resolved === false) continue;
    if (resolved === true) propsString += ` ${attr}`;
    else propsString += ` ${attr}="${escapeAttr(String(resolved))}"`;
  }

  if (SELF_CLOSING_TAGS.has(tag)) return `<${tag}${propsString} />`;
  return `<${tag}${propsString}>${renderNode(children, context)}</${tag}>`;
}

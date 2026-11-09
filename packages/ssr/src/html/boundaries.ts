/*
 * Copyright (c) 2026 Antonio Johnathan
 * Boundaries client/hydrate - ilhas
 */

import {
  CLIENT_BOUNDARY_END,
  CLIENT_BOUNDARY_MODE_CLIENT,
  CLIENT_BOUNDARY_MODE_HYDRATE,
  CLIENT_BOUNDARY_START_PREFIX,
  HYDRATE_SLOT_END,
  HYDRATE_SLOT_START
} from "@adaptive-js/shared";
import { encodeCommentPayload } from "./escape.js";
import { getVNodeChildren } from "./children.js";
import { renderManifest } from "./hydration.js";
import type { RenderContext } from "./types.js";
import { renderNode } from "./render.js";

export function renderHydrateSlot(node: any, context: RenderContext) {
  return `<!--${HYDRATE_SLOT_START}-->${renderNode(getVNodeChildren(node), context)}<!--${HYDRATE_SLOT_END}-->`;
}

export function renderClientBoundary(node: any, context: RenderContext) {
  const props = node.props ?? {};
  const moduleId = String(props["data-adaptive-client-module"] ?? "");
  const mode = String(props["data-adaptive-client-mode"] ?? CLIENT_BOUNDARY_MODE_CLIENT);
  const exportName = String(props["data-adaptive-client-export"] ?? "default");
  const rawProps = String(props["data-adaptive-client-props"] ?? "{}");
  // createBoundary escreve o booleano, mas o mesmo marcador pode chegar aqui
  // como atributo de um elemento real, ja serializado como string.
  const rawHasChildren = props["data-adaptive-client-has-children"];
  const hasChildren = rawHasChildren === true || rawHasChildren === "true";

  let boundaryId = "";
  if (mode === CLIENT_BOUNDARY_MODE_HYDRATE) {
    const next = context.hydrateBoundaryCounter?.value ?? 0;
    if (context.hydrateBoundaryCounter) context.hydrateBoundaryCounter.value++;
    boundaryId = `b${next}`;
  }

  if (moduleId) context.clientModuleIds?.add(moduleId);

  const bCtx: RenderContext = {
    ...context,
    currentBoundaryId: boundaryId,
    hydrateAidCounter: mode === CLIENT_BOUNDARY_MODE_HYDRATE ? { value: 0 } : undefined,
    hydrateReactiveCounter: mode === CLIENT_BOUNDARY_MODE_HYDRATE ? { value: 0 } : undefined,
    hydrateManifest: mode === CLIENT_BOUNDARY_MODE_HYDRATE ? [] : undefined,
    hydrateInstructionCounters: mode === CLIENT_BOUNDARY_MODE_HYDRATE ? { event: 0, ref: 0, reactive: 0, dynamicProp: 0 } : undefined
  };

  const inner = renderNode(getVNodeChildren(node), bCtx);
  const manifest = bCtx.hydrateManifest?.length ? renderManifest(boundaryId, bCtx.hydrateManifest) : "";
  const payload = encodeCommentPayload({ mode, moduleId, exportName, rawProps, hasChildren, boundaryId });

  return `<!--${CLIENT_BOUNDARY_START_PREFIX}${payload}-->${inner}${manifest}<!--${CLIENT_BOUNDARY_END}-->`;
}

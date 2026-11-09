/*
 * Copyright (c) 2026 Antonio Johnathan
 * Registro global - sem VDOM
 */


import {createEventsScope} from "../../reactive/events.js";
import {createHandlerScope} from "../../front/handler-scope.js";

export const clientBoundaryScopes = new Map<Node, {
  scope: ReturnType<typeof createEventsScope>;
  handlerScope: ReturnType<typeof createHandlerScope>;
  isConnected: () => boolean;
  isWithin: (container: ParentNode) => boolean;
}>();

export let mountedClientBoundaries = new WeakSet<Node>();
export function resetMountedBoundaries() {
  mountedClientBoundaries = new WeakSet<Node>();
}
export const registeredHydrationModules = new Map<string, Record<string, any>>();
export const boundaryHydrationNotices = new Set<string>();

export function cleanupDisconnectedClientComponentScopes() {
  for (const [node, record] of clientBoundaryScopes.entries()) {
    if (!record.isConnected()) {
      clientBoundaryScopes.delete(node);
    }
  }
}

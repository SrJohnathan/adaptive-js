/*
 * Copyright (c) 2026 Antonio Johnathan
 * Registro global - sem VDOM
 */
export const clientBoundaryScopes = new Map();
export let mountedClientBoundaries = new WeakSet();
export function resetMountedBoundaries() {
    mountedClientBoundaries = new WeakSet();
}
export const registeredHydrationModules = new Map();
export const boundaryHydrationNotices = new Set();
export function cleanupDisconnectedClientComponentScopes() {
    for (const [node, record] of clientBoundaryScopes.entries()) {
        if (!record.isConnected()) {
            clientBoundaryScopes.delete(node);
        }
    }
}
//# sourceMappingURL=registry.js.map
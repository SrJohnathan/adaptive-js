/*
 * Copyright (c) 2026 Antonio Johnathan
 * Facade pública do hydrate - sem VDOM
 */
export { renderToDOM } from "./render-to-dom.js";
export { applyHydrationInstructions, applyHydrationInstructionsBetweenMarkers } from "./instructions.js";
export { cleanupAdaptiveMarkersAfterSuccess, cleanupAdaptiveMarkersAfterSuccessBetweenMarkers, debugHydrationMarkers } from "./cleanup.js";
export { getHydrationMismatches, clearHydrationMismatches } from "./mismatch.js";
//# sourceMappingURL=index.js.map
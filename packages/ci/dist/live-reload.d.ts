import type { ServerResponse } from "node:http";
export type LiveReloadPayload = {
    buildId: string;
    at: number;
};
export declare function subscribeLiveReload(res: ServerResponse): void;
/** Chamado após rebuild bem-sucedido. */
export declare function notifyLiveReload(buildId: string): void;
export declare function liveReloadClientCount(): number;
/**
 * Script injetado no HTML de desenvolvimento.
 * Preferência: EventSource → fallback poll em build-meta.json.
 */
export declare function createDevLiveReloadScript(assetVersion: string | null): string;

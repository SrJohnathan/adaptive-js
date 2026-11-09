import { createEventsScope } from "../../reactive/events.js";
import { createHandlerScope } from "../../front/handler-scope.js";
export declare const clientBoundaryScopes: Map<Node, {
    scope: ReturnType<typeof createEventsScope>;
    handlerScope: ReturnType<typeof createHandlerScope>;
    isConnected: () => boolean;
    isWithin: (container: ParentNode) => boolean;
}>;
export declare let mountedClientBoundaries: WeakSet<Node>;
export declare function resetMountedBoundaries(): void;
export declare const registeredHydrationModules: Map<string, Record<string, any>>;
export declare const boundaryHydrationNotices: Set<string>;
export declare function cleanupDisconnectedClientComponentScopes(): void;

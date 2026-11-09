export type HandlerCallback<TPayload = any> = (payload?: TPayload) => void;
export type HandlerScope = {
    id: number;
    label?: string;
    handlers: Map<string, HandlerCallback>;
};
export declare function createHandlerScope(label?: string): HandlerScope;
export declare function runWithHandlerScope<T>(scope: HandlerScope, fn: () => T): T;
export declare function cleanupHandlerScope(scope: HandlerScope): void;
export declare function createHandler<TPayload = any>(id: string, callback: HandlerCallback<TPayload>): void;
export declare function useHandler<TPayload = any>(id: string): (payload?: TPayload) => void;
export declare function hasHandler(id: string): boolean;
export declare function clearHandlers(id?: string): void;

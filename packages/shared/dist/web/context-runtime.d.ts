export declare const CONTEXT_PROVIDER_TAG: unique symbol;
export declare function runWithServerContext<T>(id: symbol, value: unknown, fn: () => T): T;
export declare function readServerContext<T>(id: symbol, defaultValue: T): T;

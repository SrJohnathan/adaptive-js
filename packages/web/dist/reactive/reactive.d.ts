import { type Cleanup, type DependencyList, type EffectFn, type ReactiveSource, events, untrack, isSSR } from "./events.js";
export type Setter<T> = ((value: T | ((prev: T) => T)) => void) & {
    __adaptiveSource?: ReactiveSource;
};
export type Signal<T> = [() => T, Setter<T>];
export type RefBox<T> = {
    current: T | null;
};
export type StoreObject<T extends Record<string, any>> = {
    [K in keyof T]: Signal<T[K]>;
};
export declare function signal<T>(initialValue: T): Signal<T>;
export declare function rootSignal<T>(initialValue: T): Signal<T>;
export declare function createSignal<T>(initialValue: T): Signal<T>;
export declare function ref<T = any>(initialValue?: T | null): RefBox<T>;
export declare function memo<T>(compute: () => T, deps?: DependencyList): () => T;
export declare function store<T extends Record<string, any>>(initialState: T): StoreObject<T>;
export declare function rootStore<T extends Record<string, any>>(initialState: T): StoreObject<T>;
export declare function createStore<T extends Record<string, any>>(initialState: T): StoreObject<T>;
/** @deprecated use signal() */
export declare const useReactive: typeof signal;
/** @deprecated use ref() */
export declare const useRef: typeof ref;
/** @deprecated use memo() */
export declare const useMemo: typeof memo;
/** @deprecated use createSignal() */
export declare const useReactiveState: typeof signal;
export type { Cleanup, DependencyList, EffectFn, ReactiveSource };
export { events, untrack, isSSR };

import { ReactiveSource, EffectFn } from "./events.js";
export declare class AdaptiveObserver<T> implements ReactiveSource {
    private _get;
    private _set;
    private _source;
    constructor(initial: T);
    get(): T;
    set(value: T | ((prev: T) => T)): void;
    update(fn: (prev: T) => T): void;
    removeSubscriber(effect: EffectFn): void;
    get value(): T;
}

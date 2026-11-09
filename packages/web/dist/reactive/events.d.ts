export type Cleanup = void | (() => void);
export type EffectFn = () => Cleanup;
export type DependencyList = any[];
export type EffectPhase = "layout" | "effect";
export type ReactiveSource = {
    removeSubscriber(effect: EffectFn): void;
    /** Le o valor atual. E o read que assina o effect ativo. */
    get?(): any;
};
export type ReactiveSetterLike = Function & {
    __adaptiveSource?: ReactiveSource;
};
export type EventsOptions = {
    ignore?: Array<ReactiveSetterLike | {
        __adaptiveSource?: ReactiveSource;
    }>;
    phase?: EffectPhase;
    /**
     * Assina o effect nessas sources sem executar o corpo na primeira vez.
     * Para quem ja calculou o valor e so precisa da reatividade.
     */
    subscribeTo?: ReactiveSource[];
};
export type EffectScope = {
    id: number;
    label?: string;
    context?: Map<symbol, any>;
    hooks: any[];
    hookIndex: number;
};
export declare const isSSR: () => boolean;
declare function isAdaptiveHydrationDebugEnabled(): boolean;
declare function debugSignalLog(...args: any[]): void;
export type EffectInstruction = {
    kind: "layout-effect" | "effect";
    effect: EffectFn;
    deps?: DependencyList;
    ignoredSources?: ReactiveSource[];
};
export declare function runHydrationCollection<T>(fn: () => T): {
    value: T;
    unsupportedFeatures: string[];
    effectInstructions: EffectInstruction[];
};
export declare function markUnsupportedFeature(name: string): void;
declare class EventSystem {
    private currentEffect;
    private currentScope;
    private cleanups;
    private effectSources;
    private ignoredSources;
    private effectPhases;
    private effectScopes;
    private disposedEffects;
    private pending;
    private layoutQueue;
    private effectQueue;
    private flushing;
    private batchDepth;
    private nextScopeId;
    private noScopeCache;
    getCurrentEffect(): EffectFn | null;
    getCurrentScope(): EffectScope | null;
    isDisposed(effect: EffectFn): boolean;
    setCurrentEffect(effect: EffectFn | null): void;
    createScope(label?: string): EffectScope;
    runWithScope<T>(scope: EffectScope, fn: () => T): T;
    runWithContext<T>(ctxId: symbol, value: any, fn: () => T): T;
    readContext<T>(ctxId: symbol, defaultValue: T): T;
    trackSource(effect: EffectFn, source: ReactiveSource): void;
    cleanupSources(effect: EffectFn): void;
    runCleanup(effect: EffectFn): void;
    disposeEffect(effect: EffectFn): void;
    registerCleanup(effect: EffectFn, cleanup: Cleanup): void;
    setIgnoredSources(effect: EffectFn, sources?: ReactiveSource[]): void;
    setEffectPhase(effect: EffectFn, phase: EffectPhase): void;
    shouldIgnoreTrigger(effect: EffectFn, source: ReactiveSource): boolean;
    schedule(effect: EffectFn, phase?: EffectPhase): void;
    scheduleFromSource(effect: EffectFn, source: ReactiveSource): void;
    private executeEffect;
    flush(): void;
    batch<T>(fn: () => T): T;
    untrack<T>(fn: () => T): T;
    /**
     * Executa fn e devolve quais sources ela leu, sem agendar nada.
     *
     * Serve para quem precisa do valor síncrono E da lista de dependências,
     * sem pagar uma segunda execução da função. O memo é o caso: ele
     * calcula na hora para ter o valor durante o render, mas se o effect
     * rodar logo em seguida para computar de novo, a função é executada
     * duas vezes no cliente e uma no servidor.
     */
    trackSources<T>(fn: () => T): {
        value: T;
        sources: ReactiveSource[];
    };
    /**
     * Assina effect em sources sem executar o corpo dele.
     *
     * Assinar exige ler a source com o effect ativo -- é o read que registra
     * a assinatura. Ler uma source pura não roda código de usuário, então
     * dá para assinar sem recomputar.
     */
    linkSources(effect: EffectFn, sources: ReactiveSource[]): void;
    cleanupScope(scope: EffectScope): void;
    cleanupAll(): void;
    getNoScopeEntry(effect: EffectFn): {
        deps?: DependencyList;
        runner: EffectFn;
    } | undefined;
    setNoScopeEntry(effect: EffectFn, deps: DependencyList | undefined, runner: EffectFn): void;
}
export declare class EventSource<T> implements ReactiveSource {
    private subscribers;
    private value;
    constructor(initial: T);
    get(): T;
    set(next: T): void;
    update(fn: (prev: T) => T): void;
    removeSubscriber(effect: EffectFn): void;
    _getSubscribers(): Set<EffectFn>;
}
export declare function createEventSignal<T>(initial: T): [() => T, ((v: T | ((p: T) => T)) => void) & {
    __adaptiveSource: EventSource<T>;
}];
/** Bridge: signal legado avisa este motor no set(). */
export declare function notifyExternalSource(source: ReactiveSource, subscribers: Iterable<EffectFn>): void;
/** Bridge: signal legado assina no get() se houver effect ativo. */
export declare function trackExternalSource(effect: EffectFn, source: ReactiveSource): void;
export declare function runWithContext<T>(ctxId: symbol, value: any, fn: () => T): T;
export declare function readContext<T>(ctxId: symbol, defaultValue: T): T;
export declare function useHookSlot<T>(factory: () => T): T;
export declare function events(effect: EffectFn, deps?: DependencyList, options?: EventsOptions): void;
export declare function layoutEvents(effect: EffectFn, deps?: DependencyList, options?: Omit<EventsOptions, "phase">): void;
export declare function batch<T>(fn: () => T): T;
export declare function flushEvents(): void;
export declare function flushEffects(): void;
export declare function untrack<T>(fn: () => T): T;
export declare function trackSources<T>(fn: () => T): {
    value: T;
    sources: ReactiveSource[];
};
export declare function createEventsScope(label?: string): EffectScope;
export declare function createEffectScope(label?: string): EffectScope;
export declare function runWithEventsScope<T>(scope: EffectScope, fn: () => T): T;
export declare function runWithEffectScope<T>(scope: EffectScope, fn: () => T): T;
export declare function cleanupEventsScope(scope: EffectScope): void;
export declare function cleanupEffectScope(scope: EffectScope): void;
export declare function cleanupAllEvents(): void;
export declare function cleanupAllEffects(): void;
export declare function getEventsSystem(): EventSystem;
export { debugSignalLog, isAdaptiveHydrationDebugEnabled };
export declare function createReactiveEffect(effect: EffectFn, phase?: EffectPhase, options?: Pick<EventsOptions, "ignore">): () => void;
export type ReactiveSetter<T> = {
    (value: T | ((prev: T) => T)): void;
    __adaptiveSource?: ReactiveSource;
};
export type Subscriber = EffectFn;

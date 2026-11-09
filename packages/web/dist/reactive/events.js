/*
 * Copyright (c) 2026 Antonio Johnathan
 * Licensed under the MIT License.
 *
 * events() — motor de efeitos reativos do Adaptive (módulo autônomo).
 *
 * API:
 *   events(() => { console.log(count()); return () => cleanup })
 *   events(() => {}, [dep])
 *   events(() => {}, [], { phase: "layout", ignore: [setX] })
 *   layoutEvents(() => {})
 *   batch(() => { setA(1); setB(2); })
 */
import { readServerContext } from "@adaptive-js/shared";
export const isSSR = () => typeof window === "undefined";
function isAdaptiveHydrationDebugEnabled() {
    if (!isSSR() && window.__ADAPTIVE_DEBUG_HYDRATION__ === true)
        return true;
    return globalThis?.process?.env?.ADAPTIVE_PUBLIC_DEBUG_HYDRATION === "true";
}
function debugSignalLog(...args) {
    if (!isAdaptiveHydrationDebugEnabled())
        return;
    console.log("[adaptive:hydration]", ...args);
}
let activeHydrationCollection = null;
export function runHydrationCollection(fn) {
    const previous = activeHydrationCollection;
    const state = {
        unsupportedFeatures: new Set(),
        effectInstructions: [],
    };
    activeHydrationCollection = state;
    try {
        return {
            value: fn(),
            unsupportedFeatures: Array.from(state.unsupportedFeatures),
            effectInstructions: [...state.effectInstructions],
        };
    }
    finally {
        activeHydrationCollection = previous;
    }
}
export function markUnsupportedFeature(name) {
    activeHydrationCollection?.unsupportedFeatures.add(name);
    debugSignalLog("unsupported feature:", name);
}
// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------
class EventSystem {
    currentEffect = null;
    currentScope = null;
    cleanups = new Map();
    effectSources = new Map();
    ignoredSources = new WeakMap();
    effectPhases = new WeakMap();
    effectScopes = new Map();
    disposedEffects = new WeakSet();
    pending = new WeakSet();
    layoutQueue = new Set();
    effectQueue = new Set();
    flushing = false;
    batchDepth = 0;
    nextScopeId = 1;
    // cache for no-scope effects to respect deps when effect ref is stable
    noScopeCache = new Map();
    getCurrentEffect() { return this.currentEffect; }
    getCurrentScope() { return this.currentScope; }
    isDisposed(effect) { return this.disposedEffects.has(effect); }
    setCurrentEffect(effect) { this.currentEffect = effect; }
    createScope(label) {
        return { id: this.nextScopeId++, label, hooks: [], hookIndex: 0 };
    }
    runWithScope(scope, fn) {
        const prev = this.currentScope;
        const prevIndex = scope.hookIndex;
        this.currentScope = scope;
        scope.hookIndex = 0;
        try {
            return fn();
        }
        finally {
            scope.hookIndex = prevIndex;
            this.currentScope = prev;
        }
    }
    // -- Context (Provider) -----------------------------------------------
    runWithContext(ctxId, value, fn) {
        const scope = this.currentScope;
        if (!scope)
            return fn();
        const previousContext = scope.context;
        const nextContext = new Map(previousContext ?? []);
        nextContext.set(ctxId, value);
        scope.context = nextContext;
        try {
            return fn();
        }
        finally {
            scope.context = previousContext;
        }
    }
    readContext(ctxId, defaultValue) {
        const scope = this.currentScope;
        if (!scope?.context?.has(ctxId))
            return defaultValue;
        return scope.context.get(ctxId);
    }
    // -- Tracking ----------------------------------------------------------
    trackSource(effect, source) {
        let set = this.effectSources.get(effect);
        if (!set) {
            set = new Set();
            this.effectSources.set(effect, set);
        }
        set.add(source);
    }
    cleanupSources(effect) {
        const set = this.effectSources.get(effect);
        if (!set)
            return;
        for (const source of set) {
            try {
                source.removeSubscriber(effect);
            }
            catch { }
        }
        set.clear();
        this.effectSources.delete(effect);
    }
    runCleanup(effect) {
        const cleanup = this.cleanups.get(effect);
        if (typeof cleanup === "function") {
            try {
                cleanup();
            }
            catch (error) {
                console.error("Adaptive cleanup error:", error);
            }
        }
        this.cleanups.delete(effect);
    }
    disposeEffect(effect) {
        this.layoutQueue.delete(effect);
        this.effectQueue.delete(effect);
        this.pending.delete(effect);
        this.runCleanup(effect);
        this.cleanupSources(effect);
        this.ignoredSources.delete(effect);
        this.effectPhases.delete(effect);
        this.effectScopes.delete(effect);
        this.disposedEffects.add(effect);
        // also clean from noScopeCache if it was the runner
        for (const [key, val] of this.noScopeCache) {
            if (val.runner === effect) {
                this.noScopeCache.delete(key);
                break;
            }
        }
    }
    registerCleanup(effect, cleanup) {
        if (typeof cleanup === "function")
            this.cleanups.set(effect, cleanup);
        else
            this.cleanups.delete(effect);
    }
    setIgnoredSources(effect, sources = []) {
        if (sources.length === 0) {
            this.ignoredSources.delete(effect);
            return;
        }
        const next = new WeakSet();
        sources.forEach(s => next.add(s));
        this.ignoredSources.set(effect, next);
    }
    setEffectPhase(effect, phase) {
        this.effectPhases.set(effect, phase);
    }
    shouldIgnoreTrigger(effect, source) {
        const ignored = this.ignoredSources.get(effect);
        return ignored ? ignored.has(source) : false;
    }
    // -- Scheduling --------------------------------------------------------
    schedule(effect, phase = "effect") {
        if (this.isDisposed(effect))
            return;
        if (this.pending.has(effect))
            return; // dedup
        // liga ao lifecycle: captura o scope atual no momento do agendamento
        // assim cleanupScope consegue dar dispose mesmo se flush rodar depois
        if (this.currentScope && !this.effectScopes.has(effect)) {
            this.effectScopes.set(effect, this.currentScope);
        }
        this.pending.add(effect);
        if (phase === "layout")
            this.layoutQueue.add(effect);
        else
            this.effectQueue.add(effect);
        if (this.batchDepth === 0) {
            // microtask flush to batch sync sets
            queueMicrotask(() => this.flush());
        }
    }
    scheduleFromSource(effect, source) {
        if (this.isDisposed(effect))
            return;
        if (this.shouldIgnoreTrigger(effect, source)) {
            debugSignalLog("ignored trigger", effect, source);
            return;
        }
        const phase = this.effectPhases.get(effect) ?? "effect";
        this.schedule(effect, phase);
    }
    executeEffect(effect) {
        if (this.isDisposed(effect))
            return;
        const prev = this.currentEffect;
        this.currentEffect = effect;
        this.cleanupSources(effect);
        this.runCleanup(effect);
        // register scope if exists
        if (this.currentScope && !this.effectScopes.has(effect)) {
            this.effectScopes.set(effect, this.currentScope);
        }
        try {
            const result = effect();
            this.registerCleanup(effect, result);
        }
        catch (e) {
            console.error("Adaptive effect error:", e);
        }
        finally {
            this.currentEffect = prev;
        }
    }
    flush() {
        if (this.flushing)
            return;
        if (this.layoutQueue.size === 0 && this.effectQueue.size === 0)
            return;
        this.flushing = true;
        try {
            // layout first
            while (this.layoutQueue.size > 0) {
                const toRun = Array.from(this.layoutQueue);
                this.layoutQueue.clear();
                for (const eff of toRun) {
                    this.pending.delete(eff);
                    this.executeEffect(eff);
                }
            }
            // then effect
            while (this.effectQueue.size > 0) {
                const toRun = Array.from(this.effectQueue);
                this.effectQueue.clear();
                for (const eff of toRun) {
                    this.pending.delete(eff);
                    this.executeEffect(eff);
                }
            }
        }
        finally {
            this.flushing = false;
        }
    }
    batch(fn) {
        this.batchDepth++;
        try {
            return fn();
        }
        finally {
            this.batchDepth--;
            if (this.batchDepth === 0)
                this.flush();
        }
    }
    untrack(fn) {
        const prev = this.currentEffect;
        this.currentEffect = null;
        try {
            return fn();
        }
        finally {
            this.currentEffect = prev;
        }
    }
    /**
     * Executa fn e devolve quais sources ela leu, sem agendar nada.
     *
     * Serve para quem precisa do valor síncrono E da lista de dependências,
     * sem pagar uma segunda execução da função. O memo é o caso: ele
     * calcula na hora para ter o valor durante o render, mas se o effect
     * rodar logo em seguida para computar de novo, a função é executada
     * duas vezes no cliente e uma no servidor.
     */
    trackSources(fn) {
        const probe = (() => { });
        const prev = this.currentEffect;
        this.currentEffect = probe;
        try {
            const value = fn();
            const set = this.effectSources.get(probe);
            return { value, sources: set ? [...set] : [] };
        }
        finally {
            this.currentEffect = prev;
            this.effectSources.delete(probe);
        }
    }
    /**
     * Assina effect em sources sem executar o corpo dele.
     *
     * Assinar exige ler a source com o effect ativo -- é o read que registra
     * a assinatura. Ler uma source pura não roda código de usuário, então
     * dá para assinar sem recomputar.
     */
    linkSources(effect, sources) {
        if (sources.length === 0)
            return;
        const prev = this.currentEffect;
        this.currentEffect = effect;
        try {
            // Source sem get() nao da para assinar por leitura; nesse caso o
            // effect so vai reagir quando o proprio corpo rodar.
            for (const source of sources)
                source.get?.();
        }
        finally {
            this.currentEffect = prev;
        }
    }
    // -- Scopes ------------------------------------------------------------
    cleanupScope(scope) {
        for (const [eff, effScope] of this.effectScopes.entries()) {
            if (effScope === scope)
                this.disposeEffect(eff); // <- roda cleanup do init
        }
        // reset init hooks
        for (const hook of scope.hooks) {
            if (!hook)
                continue;
            if (typeof hook === "object") {
                if ("scheduled" in hook)
                    hook.scheduled = false;
                if ("runner" in hook && hook.runner) {
                    this.disposeEffect(hook.runner);
                }
                if ("dispose" in hook && typeof hook.dispose === "function") {
                    try {
                        hook.dispose();
                    }
                    catch { }
                }
                if (hook.signal && Array.isArray(hook.signal)) {
                    // memo signal cleanup is handled via dispose above
                }
            }
        }
        scope.hooks.length = 0;
        scope.hookIndex = 0;
        scope.context = undefined;
    }
    cleanupAll() {
        for (const eff of Array.from(this.effectSources.keys())) {
            this.disposeEffect(eff);
        }
        this.layoutQueue.clear();
        this.effectQueue.clear();
        this.noScopeCache.clear();
    }
    // no-scope helpers
    getNoScopeEntry(effect) { return this.noScopeCache.get(effect); }
    setNoScopeEntry(effect, deps, runner) {
        this.noScopeCache.set(effect, { deps, runner });
    }
}
const system = new EventSystem();
// ---------------------------------------------------------------------------
// EventSource — signal core
// ---------------------------------------------------------------------------
export class EventSource {
    subscribers = new Set();
    value;
    constructor(initial) { this.value = initial; }
    get() {
        const effect = system.getCurrentEffect();
        if (effect && !system.isDisposed(effect)) {
            this.subscribers.add(effect);
            system.trackSource(effect, this);
        }
        return this.value;
    }
    set(next) {
        if (Object.is(this.value, next))
            return;
        this.value = next;
        debugSignalLog("set", next, "subs:", this.subscribers.size);
        for (const sub of [...this.subscribers])
            system.scheduleFromSource(sub, this);
    }
    update(fn) { this.set(fn(this.value)); }
    removeSubscriber(effect) { this.subscribers.delete(effect); }
    // for bridge
    _getSubscribers() { return this.subscribers; }
}
export function createEventSignal(initial) {
    const source = new EventSource(initial);
    const get = () => source.get();
    const set = ((v) => {
        if (typeof v === "function")
            source.update(v);
        else
            source.set(v);
    });
    set.__adaptiveSource = source;
    return [get, set];
}
/** Bridge: signal legado avisa este motor no set(). */
export function notifyExternalSource(source, subscribers) {
    for (const effect of subscribers)
        system.scheduleFromSource(effect, source);
}
/** Bridge: signal legado assina no get() se houver effect ativo. */
export function trackExternalSource(effect, source) {
    system.trackSource(effect, source);
}
// ---------------------------------------------------------------------------
// Context API
// ---------------------------------------------------------------------------
export function runWithContext(ctxId, value, fn) {
    return system.runWithContext(ctxId, value, fn);
}
export function readContext(ctxId, defaultValue) {
    const value = system.readContext(ctxId, defaultValue);
    if (value !== defaultValue)
        return value;
    return readServerContext(ctxId, defaultValue);
}
// ---------------------------------------------------------------------------
// Hook slot
// ---------------------------------------------------------------------------
export function useHookSlot(factory) {
    const scope = system.getCurrentScope();
    if (!scope)
        return factory();
    const index = scope.hookIndex++;
    if (!scope.hooks[index])
        scope.hooks[index] = factory();
    return scope.hooks[index];
}
// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------
function resolveIgnored(ignore) {
    if (!ignore?.length)
        return [];
    return ignore.map(item => item.__adaptiveSource).filter((s) => Boolean(s));
}
function haveDepsChanged(prev, next) {
    if (!prev)
        return true;
    if (prev.length !== next.length)
        return true;
    return next.some((d, i) => !Object.is(d, prev[i]));
}
export function events(effect, deps = [], options = {}) {
    const phase = options.phase ?? "effect";
    const ignored = resolveIgnored(options.ignore);
    const subscribeTo = options.subscribeTo;
    const resolvedDeps = deps.map(d => (typeof d === "function" ? d() : d));
    if (activeHydrationCollection) {
        activeHydrationCollection.effectInstructions.push({
            kind: phase === "layout" ? "layout-effect" : "effect",
            effect,
            deps: resolvedDeps,
            ignoredSources: ignored,
        });
        debugSignalLog("collect", phase, effect);
        return;
    }
    if (isSSR())
        return;
    const scope = system.getCurrentScope();
    if (!scope) {
        // no-scope path: respect deps if same effect reference reused
        const cached = system.getNoScopeEntry(effect);
        if (cached && !haveDepsChanged(cached.deps, resolvedDeps)) {
            return; // deps equal, skip
        }
        const runner = () => effect();
        system.setIgnoredSources(runner, ignored);
        system.setEffectPhase(runner, phase);
        system.setNoScopeEntry(effect, resolvedDeps, runner);
        if (subscribeTo) {
            system.linkSources(runner, subscribeTo);
            return;
        }
        system.schedule(runner, phase);
        return;
    }
    const index = scope.hookIndex++;
    if (!scope.hooks[index]) {
        const state = {
            effect,
            deps: undefined,
            initialized: false,
            runner: () => state.effect(),
        };
        scope.hooks[index] = state;
    }
    const hook = scope.hooks[index];
    hook.effect = effect;
    system.setIgnoredSources(hook.runner, ignored);
    system.setEffectPhase(hook.runner, phase);
    if (hook.initialized && !haveDepsChanged(hook.deps, resolvedDeps))
        return;
    hook.initialized = true;
    hook.deps = resolvedDeps;
    if (subscribeTo) {
        system.linkSources(hook.runner, subscribeTo);
        return;
    }
    system.schedule(hook.runner, phase);
}
export function layoutEvents(effect, deps = [], options = {}) {
    events(effect, deps, { ...options, phase: "layout" });
}
export function batch(fn) { return system.batch(fn); }
export function flushEvents() { system.flush(); }
export function flushEffects() { system.flush(); } // alias compat
export function untrack(fn) { return system.untrack(fn); }
export function trackSources(fn) {
    return system.trackSources(fn);
}
export function createEventsScope(label) { return system.createScope(label); }
export function createEffectScope(label) { return system.createScope(label); } // compat
export function runWithEventsScope(scope, fn) { return system.runWithScope(scope, fn); }
export function runWithEffectScope(scope, fn) { return system.runWithScope(scope, fn); }
export function cleanupEventsScope(scope) { system.cleanupScope(scope); }
export function cleanupEffectScope(scope) { system.cleanupScope(scope); }
export function cleanupAllEvents() { system.cleanupAll(); }
export function cleanupAllEffects() { system.cleanupAll(); }
export function getEventsSystem() { return system; }
export { debugSignalLog, isAdaptiveHydrationDebugEnabled };
// ---------------------------------------------------------------------------
// Aliases de compatibilidade com o index.ts antigo (pra poder apagar index)
// ---------------------------------------------------------------------------
export function createReactiveEffect(effect, phase = "layout", options = {}) {
    const runner = () => effect();
    system.setIgnoredSources(runner, resolveIgnored(options.ignore));
    system.setEffectPhase(runner, phase);
    system.schedule(runner, phase);
    return () => {
        system.disposeEffect(runner);
    };
}
//# sourceMappingURL=events.js.map
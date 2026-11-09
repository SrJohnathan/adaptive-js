/*
 * API pública de estado reativo do Adaptive.
 * Nomes próprios (sem use* do React).
 *
 *   const [count, setCount] = signal(0);
 *   const box = ref<HTMLDivElement>(null);
 *   const label = memo(() => `n=${count()}`);
 *   const form = store({ name: "", age: 0 });
 */
import { createEventSignal, events, trackSources, untrack, useHookSlot, isSSR, } from "./events.js";
// ---------------------------------------------------------------------------
// signal
// ---------------------------------------------------------------------------
export function signal(initialValue) {
    return useHookSlot(() => createEventSignal(initialValue));
}
export function rootSignal(initialValue) {
    return createEventSignal(initialValue);
}
export function createSignal(initialValue) {
    // alias compat - antes ficava no index.ts
    return createEventSignal(initialValue);
}
// ---------------------------------------------------------------------------
// ref
// ---------------------------------------------------------------------------
export function ref(initialValue = null) {
    return useHookSlot(() => ({ current: initialValue }));
}
function depsChanged(prev, next) {
    if (!prev)
        return true;
    if (prev.length !== next.length)
        return true;
    return next.some((d, i) => !Object.is(d, prev[i]));
}
export function memo(compute, deps) {
    const hook = useHookSlot(() => ({
        signal: createEventSignal(undefined),
        initialized: false,
    }));
    if (!hook.initialized) {
        hook.initialized = true;
        const [, set] = hook.signal;
        // Calcula uma vez, agora, para o valor existir durante o render. As
        // dependências saem da mesma execução de graça: o effect se assina
        // nelas sem rodar compute de novo.
        //
        // Antes isso era untrack(compute()) + events(() => set(compute())). No
        // cliente o events roda na hora, então compute executava DUAS vezes --
        // e no servidor uma, porque events() sai cedo em SSR. Essa diferença
        // de 1 para 2 fazia o contador do exemplo divergir do HTML do servidor.
        const { value, sources } = trackSources(() => compute());
        set(value);
        // efeito reativo que mantém memo atualizado automaticamente
        // guardamos runner via events para cleanup
        events(() => {
            set(compute());
        }, [], { subscribeTo: sources });
        if (deps)
            hook.prevDeps = deps.map(d => typeof d === "function" ? d() : d);
        return hook.signal[0];
    }
    // compat: se deps explicito for passado, só recomputa quando mudar
    if (Array.isArray(deps) && deps.length > 0) {
        const resolved = deps.map(d => typeof d === "function" ? d() : d);
        if (depsChanged(hook.prevDeps, resolved)) {
            hook.prevDeps = resolved;
            hook.signal[1](untrack(() => compute()));
        }
    }
    return hook.signal[0];
}
// ---------------------------------------------------------------------------
// store
// ---------------------------------------------------------------------------
export function store(initialState) {
    return useHookSlot(() => {
        const out = {};
        for (const key of Object.keys(initialState)) {
            out[key] = createEventSignal(initialState[key]);
        }
        return out;
    });
}
export function rootStore(initialState) {
    const out = {};
    for (const key of Object.keys(initialState)) {
        out[key] = createEventSignal(initialState[key]);
    }
    return out;
}
export function createStore(initialState) {
    return store(initialState);
}
// ---------------------------------------------------------------------------
// Aliases legados (compat com index.ts antigo)
// ---------------------------------------------------------------------------
/** @deprecated use signal() */
export const useReactive = signal;
/** @deprecated use ref() */
export const useRef = ref;
/** @deprecated use memo() */
export const useMemo = memo;
/** @deprecated use createSignal() */
export const useReactiveState = signal;
export { events, untrack, isSSR };
//# sourceMappingURL=reactive.js.map
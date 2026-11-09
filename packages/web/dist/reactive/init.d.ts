import { type EffectFn, type EffectScope } from "./events.js";
/**
 * Executa quando o componente aparece na tela (por instância / scope).
 * Return = cleanup na saída da tela (unmount).
 *
 * Agora 100% ligado ao ciclo de vida:
 * - mount: roda em layout phase, após DOM inserido
 * - unmount: cleanup é chamado quando cleanupEventsScope(scope) roda
 *           no boundary-component.ts (isConnected === false)
 */
export declare function init(effect: EffectFn): void;
/**
 * Efeito cliente genérico (compat com useClientEffect antigo).
 * Roda como effect normal no client, respeita deps.
 */
export declare function useClientEffect(effect: EffectFn, deps?: any[]): void;
/**
 * Disparo inicial estreito (SEM REATIVIDADE) — compat com useDOMEffect antigo.
 * Isola completamente para que sinais lidos NÃO assinem o efeito.
 * Garante execução após DOM pronto.
 */
export declare function useDOMEffect(effect: EffectFn): void;
/** Helpers reexportados para o renderer */
export { createEventsScope as createInitScope, createEffectScope as createInitScopeCompat, runWithEventsScope as runWithInitScope, runWithEffectScope as runWithInitScopeCompat, cleanupEventsScope as cleanupInitScope, cleanupEffectScope as cleanupInitScopeCompat, } from "./events.js";
export type { EffectScope as InitScope };

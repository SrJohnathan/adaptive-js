import type { AdaptiveHydrationMismatch } from "./types.js";
/**
 * Eventos que o painel de dev escuta. O painel é injetado pelo ci em
 * desenvolvimento, então em produção ninguém escuta e o custo é um dispatch.
 */
export declare const HYDRATION_MISMATCH_EVENT = "adaptive:hydration-mismatch";
export declare const HYDRATION_ERROR_EVENT = "adaptive:hydration-error";
/**
 * Relatar nunca pode derrubar quem esta reportando.
 *
 * warnMismatch e chamado de dentro de effects reativos. Se qualquer coisa aqui
 * lancar (ler a rota, capturar snippet, despachar o evento), a excecao sobe e o
 * effect morre no meio -- a ilha fica com o HTML do servidor e nenhum sinal de
 * que a correcao do DOM nao aconteceu.
 */
export declare function warnMismatch(details: {
    path: string;
    message: string;
    expected?: string;
    found?: string;
    node?: Node;
}): void;
/**
 * Erro lançado dentro da hidratação. Antes isso era console.warn e a ilha
 * morria em silêncio, com o HTML do servidor ainda na tela e nenhuma pista de
 * que algo quebrou.
 */
export declare function reportHydrationError(error: unknown, scope?: {
    moduleId?: string;
    exportName?: string;
}): void;
export declare function warnHydrationInstructionMissing(root: ParentNode | null, kind: string, id: string): void;
export declare function getHydrationMismatches(): AdaptiveHydrationMismatch[];
export declare function clearHydrationMismatches(): void;
export declare function debugHydrationLog(...args: any[]): void;

/*
 * Copyright (c) 2026 Antonio Johnathan
 * Debug e mismatch - pode ser tree-shaken em prod
 */
import { applyHydrationPayloadToWindow } from "@adaptive-js/shared";
/**
 * Eventos que o painel de dev escuta. O painel é injetado pelo ci em
 * desenvolvimento, então em produção ninguém escuta e o custo é um dispatch.
 */
export const HYDRATION_MISMATCH_EVENT = "adaptive:hydration-mismatch";
export const HYDRATION_ERROR_EVENT = "adaptive:hydration-error";
const mismatchLog = new Set();
const mismatchHistory = [];
/**
 * Relatar nunca pode derrubar quem esta reportando.
 *
 * warnMismatch e chamado de dentro de effects reativos. Se qualquer coisa aqui
 * lancar (ler a rota, capturar snippet, despachar o evento), a excecao sobe e o
 * effect morre no meio -- a ilha fica com o HTML do servidor e nenhum sinal de
 * que a correcao do DOM nao aconteceu.
 */
export function warnMismatch(details) {
    const key = `${details.path}:${details.message}`;
    if (mismatchLog.has(key))
        return;
    mismatchLog.add(key);
    let route;
    let htmlSnippet;
    try {
        route = readHydrationRoute();
    }
    catch {
        // Rota e contexto, nao a mensagem. Perder isso nao impede o report.
    }
    try {
        htmlSnippet = captureNodeSnippet(details.node);
    }
    catch {
        // idem
    }
    const entry = {
        path: details.path,
        route,
        message: details.message,
        expected: details.expected,
        found: details.found,
        htmlSnippet,
        timestamp: Date.now()
    };
    mismatchHistory.push(entry);
    if (typeof window !== "undefined") {
        window.__ADAPTIVE_HYDRATION_MISMATCHES__ ??= [];
        window.__ADAPTIVE_HYDRATION_MISMATCHES__.push(entry);
        dispatch(HYDRATION_MISMATCH_EVENT, entry);
    }
    if (isHydrationDebugEnabled()) {
        console.warn("[Adaptive hydration mismatch]", entry);
    }
}
/**
 * Erro lançado dentro da hidratação. Antes isso era console.warn e a ilha
 * morria em silêncio, com o HTML do servidor ainda na tela e nenhuma pista de
 * que algo quebrou.
 */
export function reportHydrationError(error, scope) {
    const isError = error instanceof Error;
    const moduleId = scope?.moduleId;
    const exportName = scope?.exportName;
    const detail = {
        path: ["hydrate", moduleId, exportName].filter(Boolean).join("."),
        message: isError ? error.message : String(error),
        stack: isError ? error.stack : undefined,
        moduleId,
        exportName,
        timestamp: Date.now()
    };
    if (typeof window !== "undefined") {
        window.__ADAPTIVE_HYDRATION_ERRORS__ ??= [];
        window.__ADAPTIVE_HYDRATION_ERRORS__.push(detail);
        dispatch(HYDRATION_ERROR_EVENT, detail);
    }
    console.error("[Adaptive hydration]", detail.message, error);
}
function dispatch(name, detail) {
    try {
        window.dispatchEvent(new CustomEvent(name, { detail }));
    }
    catch {
        // ambiente sem CustomEvent: o console.error ainda cobre o caso
    }
}
export function warnHydrationInstructionMissing(root, kind, id) {
    warnMismatch({
        path: `hydrate.instruction.${kind}.${id}`,
        message: "Hydration instruction target was not found in existing DOM",
        expected: `[data-aid="${id}"]`,
        found: "nothing",
        node: root instanceof Node ? root : undefined
    });
}
export function getHydrationMismatches() {
    return [...mismatchHistory];
}
export function clearHydrationMismatches() {
    mismatchLog.clear();
    mismatchHistory.length = 0;
    if (typeof window !== "undefined") {
        window.__ADAPTIVE_HYDRATION_MISMATCHES__ = [];
    }
}
function isHydrationDebugEnabled() {
    if (typeof window !== "undefined" && window.__ADAPTIVE_DEBUG_HYDRATION__ === true)
        return true;
    return globalThis?.process?.env?.ADAPTIVE_PUBLIC_DEBUG_HYDRATION === "true";
}
export function debugHydrationLog(...args) {
    if (!isHydrationDebugEnabled())
        return;
    console.log(...args);
}
function readHydrationRoute() {
    // window sem document acontece em ambiente com shim (worker, test runner).
    // Um diagnóstico que lança ao relatar esconde o erro que ele ia mostrar.
    if (typeof window === "undefined" || typeof document === "undefined")
        return "server";
    applyHydrationPayloadToWindow(document);
    return window.__ROUTE__ ?? window.location.pathname;
}
function captureNodeSnippet(node) {
    if (!node)
        return undefined;
    if (node.nodeType === Node.TEXT_NODE)
        return node.textContent ?? "";
    if (node.nodeType === Node.COMMENT_NODE)
        return `<!--${node.textContent ?? ""}-->`;
    if (node.nodeType === Node.ELEMENT_NODE)
        return node.outerHTML.slice(0, 200);
    return undefined;
}
//# sourceMappingURL=mismatch.js.map
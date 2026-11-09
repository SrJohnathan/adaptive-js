/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
// handler-scope.ts
let isDispatchingHandler = false;
const missingScopeWarnings = new Set();
let currentHandlerScope = null;
let nextHandlerScopeId = 1;
// registry global:
// id do handler -> scope -> callback
const handlers = new Map();
export function createHandlerScope(label) {
    return {
        id: nextHandlerScopeId++,
        label,
        handlers: new Map()
    };
}
export function runWithHandlerScope(scope, fn) {
    const previous = currentHandlerScope;
    currentHandlerScope = scope;
    try {
        return fn();
    }
    finally {
        currentHandlerScope = previous;
    }
}
export function cleanupHandlerScope(scope) {
    for (const id of scope.handlers.keys()) {
        const group = handlers.get(id);
        if (group) {
            group.delete(scope.id);
            if (group.size === 0) {
                handlers.delete(id);
            }
        }
    }
    scope.handlers.clear();
}
export function createHandler(id, callback) {
    if (isDispatchingHandler) {
        throw new Error(`[Adaptive Handler] createHandler("${id}") não pode ser chamado dentro de outro handler.`);
    }
    if (!currentHandlerScope) {
        if (typeof window !== "undefined" && !missingScopeWarnings.has(id)) {
            missingScopeWarnings.add(id);
            console.warn(`[Adaptive Handler] createHandler("${id}") foi ignorado porque não existe um HandlerScope ativo. ` +
                "Use-o durante a montagem ou hidratação de um componente interativo.");
        }
        return;
    }
    const scope = currentHandlerScope;
    const cb = callback;
    // se já existe handler com esse id nesse componente,
    // substitui pelo último
    scope.handlers.set(id, cb);
    let group = handlers.get(id);
    if (!group) {
        group = new Map();
        handlers.set(id, group);
    }
    group.set(scope.id, cb);
}
export function useHandler(id) {
    return (payload) => {
        const group = handlers.get(id);
        if (!group || group.size === 0)
            return;
        isDispatchingHandler = true;
        try {
            for (const callback of [...group.values()]) {
                callback(payload);
            }
        }
        finally {
            isDispatchingHandler = false;
        }
    };
}
export function hasHandler(id) {
    return Boolean(handlers.get(id)?.size);
}
export function clearHandlers(id) {
    if (id) {
        const group = handlers.get(id);
        if (group) {
            for (const scopeId of group.keys()) {
                // não temos acesso direto ao scope aqui,
                // então só limpa o registry global
                group.delete(scopeId);
            }
        }
        handlers.delete(id);
        return;
    }
    handlers.clear();
}
//# sourceMappingURL=handler-scope.js.map
/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
/**
 * Cria uma resposta de redirect (SSR-safe e agnóstico de adapter)
 */
export function redirect(location, status = 302) {
    return {
        __type: "redirect",
        location,
        status,
    };
}
//# sourceMappingURL=response.js.map
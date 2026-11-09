/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * Runtime minimalista - sem VDOM, preserva thunks pra hidratação fina
 */
// factory usado pelo compilador automático (react-jsx)
// jsx(type, props)      -> filhos em props.children
// jsx(type, props, key) -> 3º argumento é a KEY, não um filho
//
// O transform do ci (oxc, runtime automatic) emite a key no 3º argumento:
//   _jsxs("li", { children: [...] }, item)
// Tratar o 3º argumento como filho faz a key virar conteúdo e descarta todos os
// filhos de qualquer elemento que tenha key.
export function jsx(type, props, key) {
    const { children: propChildren, key: propsKey, ...rest } = props ?? {};
    const normalized = propChildren == null ? []
        : Array.isArray(propChildren) ? propChildren
            : [propChildren];
    const finalKey = key !== undefined ? key : propsKey;
    // props sem children + key separada - padrão react-jsx
    return {
        tag: type,
        props: rest,
        children: normalized,
        ...(finalKey != null ? { key: finalKey } : {}),
    };
}
export const jsxs = jsx;
export const jsxDEV = jsx;
// Fragment sem DOM extra - Symbol compartilhado server/client
export const Fragment = Symbol.for("adaptive.fragment");
//# sourceMappingURL=jsx-runtime.js.map
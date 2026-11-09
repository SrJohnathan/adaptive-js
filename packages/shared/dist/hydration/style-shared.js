/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
export function toCssPropertyName(styleKey) {
    return styleKey.replace(/([A-Z])/g, "-$1").toLowerCase();
}
export function resolveStyleEntries(style) {
    const resolved = typeof style === "function" ? style() : style;
    if (!resolved || typeof resolved !== "object") {
        return [];
    }
    return Object.entries(resolved).flatMap(([styleKey, styleValue]) => {
        const value = typeof styleValue === "function" ? styleValue() : styleValue;
        if (value == null || value === false) {
            return [];
        }
        return [[styleKey, value]];
    });
}
export function serializeStyleLike(style) {
    return resolveStyleEntries(style)
        .map(([styleKey, styleValue]) => `${toCssPropertyName(styleKey)}:${styleValue}`)
        .join(";");
}
//# sourceMappingURL=style-shared.js.map
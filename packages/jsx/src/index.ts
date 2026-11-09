/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import {JSX} from "./jsx-runtime.js";

export {
    Fragment,
    jsx,
    jsxs,
    jsxDEV,


} from "./jsx-runtime.js";

export type {
    AdaptiveChild,
    AdaptiveNode,
    AdaptiveType,
    Ref,

} from "./types.js";

export type StyleObject = JSX.StyleObject;
export type MaybeSignal<T> = JSX.MaybeSignal<T>;

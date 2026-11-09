/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

export {events,
    layoutEvents,
    batch,
    flushEvents,
    isSSR,
    readContext,
    runHydrationCollection,
    runWithContext,
    runWithEffectScope,
    cleanupEventsScope,
    cleanupEffectScope,
    untrack,
    createEffectScope,
    createReactiveEffect
} from "./events.js"
// Tipos no canal de valor: o SSR faz `import` real deste barrel e o Node
// rejeita o módulo se o reexport virar binding de runtime.
export type {DependencyList, ReactiveSource} from "./events.js"
export {signal, rootSignal, ref, memo, store, rootStore, createSignal,RefBox} from "./reactive.js"
export {init} from "./init.js"
export {AdaptiveObserver} from "./adaptive-observer.js"

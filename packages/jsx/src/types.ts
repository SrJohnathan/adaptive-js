/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 */

export type MaybeSignal<T> = T | (() => T);

export interface Ref<T> {
  current: T | null;
}

// IR fino - sem boolean, boolean é filtrado no web runtime
export type AdaptiveChild =
    | string
    | number
    | null
    | undefined
    | AdaptiveType
    | AdaptiveChild[]
    | (() => AdaptiveChild);

export interface AdaptiveType {
  tag: string | symbol | ((props: any) => AdaptiveNode);
  props?: Record<string, any>;
  children?: AdaptiveChild[];
}

export type AdaptiveNode =
    | AdaptiveType
    | Promise<AdaptiveType>
    | AdaptiveChild;
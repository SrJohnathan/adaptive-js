import type { JSX } from "@adaptive-js/web/jsx-runtime";
type MaybeSignal<T> = JSX.MaybeSignal<T>;
/** Tipo visual do skeleton */
export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded" | "card";
/** Dimensão CSS: número vira px, string é usada como veio (ex: "100%", "12rem") */
export type Dimension = string | number;
/** Tema forçado do skeleton. Se omitido, segue o tema do sistema. */
export type SkeletonTheme = "light" | "dark";
export interface SkeletonProps {
    /** Tipo visual do skeleton */
    variant?: MaybeSignal<SkeletonVariant>;
    /** Largura customizada (ex: "100%", "200px", 40) */
    width?: MaybeSignal<Dimension | undefined>;
    /** Altura customizada (ex: "20px", "100%", 40) */
    height?: MaybeSignal<Dimension | undefined>;
    /** Quantidade de linhas para simular parágrafos/textos (válido quando variant="text") */
    lines?: MaybeSignal<number>;
    /** Indica se a animação shimmer está ativa */
    animated?: MaybeSignal<boolean>;
    /** Estilos inline adicionais (chaves de CSSStyleDeclaration + custom properties --x) */
    style?: MaybeSignal<JSX.StyleObject>;
    /** Classe CSS customizada */
    class?: MaybeSignal<string>;
    /** Força "light" ou "dark". Se não informado, segue prefers-color-scheme do sistema */
    theme?: MaybeSignal<SkeletonTheme | undefined>;
}
export declare const SkeletonLoader: (props: SkeletonProps) => import("@adaptive-js/jsx").AdaptiveNode;
export {};

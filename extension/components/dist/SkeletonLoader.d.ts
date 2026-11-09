import { MaybeSignal, StyleObject } from "@adaptive-js/web";
/** Tipo visual do skeleton */
export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded" | "card";
/** Dimensão CSS: número vira px, string é usada como veio (ex: "100%", "12rem") */
export type Dimension = string | number;
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
    style?: MaybeSignal<StyleObject>;
    /** Classe CSS customizada */
    class?: MaybeSignal<string>;
}
export declare const SkeletonLoader: (props: SkeletonProps) => import("@adaptive-js/jsx").AdaptiveNode;

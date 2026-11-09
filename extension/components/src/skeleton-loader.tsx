/*
 *
 *  * Copyright (c) 2026 Antonio Johnathan
 *  *
 *  * Licensed under the MIT License.
 *  * See LICENSE file in the project root for full license information.
 *
 */



import { signal } from "@adaptive-js/web";
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

export const SkeletonLoader = (props: SkeletonProps) => {
    // Helper para resolver props que podem vir como Signal/Função ou valor direto
    const getValue = <T,>(prop: MaybeSignal<T> | undefined, fallback: T): T => {
        if (typeof prop === "function") {
            return (prop as () => T)();
        }
        return prop !== undefined ? prop : fallback;
    };

    const formatDimension = (val?: Dimension): string | undefined => {
        if (val === undefined) return undefined;
        return typeof val === "number" ? `${val}px` : val;
    };

    const variant = () => getValue<SkeletonVariant>(props.variant, "text");
    const animated = () => getValue<boolean>(props.animated, true);
    const lines = () => getValue<number>(props.lines, 1);
    const customClass = () => getValue<string>(props.class, "");
    const customStyle = () => getValue<JSX.StyleObject>(props.style, {});
    const theme = () => getValue<SkeletonTheme | undefined>(props.theme, undefined);

    // Resolve width/height que podem vir como valor direto ou como thunk
    const resolveWidth = () => getValue<Dimension | undefined>(props.width, undefined);
    const resolveHeight = () => getValue<Dimension | undefined>(props.height, undefined);

    const computedWidth = (): string | undefined => {
        const rawWidth = resolveWidth();
        if (rawWidth !== undefined) return formatDimension(rawWidth);
        return variant() === "circular" ? "40px" : "100%";
    };

    const computedHeight = (): string | undefined => {
        const rawHeight = resolveHeight();
        if (rawHeight !== undefined) return formatDimension(rawHeight);

        const v = variant();
        if (v === "text") return "1em";
        if (v === "circular") return "40px";
        if (v === "card") return "180px";
        return "100px";
    };

    const containerStyle = (): JSX.StyleObject => ({
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...customStyle(),
    });

    const baseStyle = (): JSX.StyleObject => ({
        width: computedWidth(),
        height: computedHeight(),
        ...customStyle(),
    });

    return (
        <>
            {() => {
                const v = variant();
                const l = lines();

                // Se for variante 'text' com múltiplas linhas
                if (v === "text" && l > 1) {
                    return (
                        <div
                            class={() => `skeleton-container ${customClass()}`}
                            style={containerStyle}
                        >
                            {Array.from({ length: l }).map((_, index) => (
                                <SkeletonLoader
                                    key={index}
                                    variant="text"
                                    // Correção: avalia o valor real do width antes do fallback de 70%
                                    width={() => {
                                        const resolved = resolveWidth();
                                        return index === l - 1 && !resolved ? "70%" : resolved;
                                    }}
                                    height={props.height}
                                    animated={props.animated}
                                    theme={props.theme}
                                />
                            ))}
                        </div>
                    );
                }

                return (
                    <div
                        class={() => `skeleton-base skeleton-${v} ${animated() ? "skeleton-animated" : ""} ${theme() ? `skeleton-theme-${theme()}` : ""} ${customClass()}`}
                        style={baseStyle}
                    />
                );
            }}

            <style>{`
        .skeleton-base {
          display: inline-block;
          background-color: var(--skeleton-bg, #e2e8f0);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .skeleton-text {
          border-radius: 4px;
          margin-top: 0.25em;
          margin-bottom: 0.25em;
        }

        .skeleton-circular {
          border-radius: 50%;
        }

        .skeleton-rectangular {
          border-radius: 0px;
        }

        .skeleton-rounded {
          border-radius: 8px;
        }

        .skeleton-card {
          border-radius: 12px;
        }

        .skeleton-animated::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            var(--skeleton-shine-a, rgba(255, 255, 255, 0.4)) 20%,
            var(--skeleton-shine-b, rgba(255, 255, 255, 0.6)) 60%,
            rgba(255, 255, 255, 0)
          );
          animation: skeleton-shimmer 1.5s infinite;
          content: '';
        }

        @keyframes skeleton-shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        /* theme="dark" força escuro */
        .skeleton-theme-dark {
          --skeleton-bg: #2d3748;
          --skeleton-shine-a: rgba(255, 255, 255, 0.08);
          --skeleton-shine-b: rgba(255, 255, 255, 0.16);
        }

        /* sem theme: segue o sistema. theme="light" fica de fora e usa o padrão claro */
        @media (prefers-color-scheme: dark) {
          .skeleton-base:not(.skeleton-theme-light):not(.skeleton-theme-dark) {
            --skeleton-bg: #2d3748;
            --skeleton-shine-a: rgba(255, 255, 255, 0.08);
            --skeleton-shine-b: rgba(255, 255, 255, 0.16);
          }
        }
      `}</style>
        </>
    );
};
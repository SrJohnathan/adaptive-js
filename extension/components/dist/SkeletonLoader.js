/*
 *
 *  * Copyright (c) 2026 Antonio Johnathan
 *  *
 *  * Licensed under the MIT License.
 *  * See LICENSE file in the project root for full license information.
 *
 */
'hydrate';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
export const SkeletonLoader = (props) => {
    // Helper para resolver props que podem vir como Signal/Função ou valor direto
    const getValue = (prop, fallback) => {
        if (typeof prop === "function") {
            return prop();
        }
        return prop !== undefined ? prop : fallback;
    };
    const formatDimension = (val) => {
        if (val === undefined)
            return undefined;
        return typeof val === "number" ? `${val}px` : val;
    };
    const variant = () => getValue(props.variant, "text");
    const animated = () => getValue(props.animated, true);
    const lines = () => getValue(props.lines, 1);
    const customClass = () => getValue(props.class, "");
    const customStyle = () => getValue(props.style, {});
    // Resolve width/height que podem vir como valor direto ou como thunk
    const resolveWidth = () => getValue(props.width, undefined);
    const resolveHeight = () => getValue(props.height, undefined);
    const computedWidth = () => {
        const rawWidth = resolveWidth();
        if (rawWidth !== undefined)
            return formatDimension(rawWidth);
        return variant() === "circular" ? "40px" : "100%";
    };
    const computedHeight = () => {
        const rawHeight = resolveHeight();
        if (rawHeight !== undefined)
            return formatDimension(rawHeight);
        const v = variant();
        if (v === "text")
            return "1em";
        if (v === "circular")
            return "40px";
        if (v === "card")
            return "180px";
        return "100px";
    };
    const containerStyle = () => ({
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...customStyle(),
    });
    const baseStyle = () => ({
        width: computedWidth(),
        height: computedHeight(),
        ...customStyle(),
    });
    return (_jsxs(_Fragment, { children: [() => {
                const v = variant();
                const l = lines();
                // Se for variante 'text' com múltiplas linhas
                if (v === "text" && l > 1) {
                    return (_jsx("div", { class: () => `skeleton-container ${customClass()}`, style: containerStyle, children: Array.from({ length: l }).map((_, index) => (_jsx(SkeletonLoader, { variant: "text", 
                            // Correção: avalia o valor real do width antes do fallback de 70%
                            width: () => {
                                const resolved = resolveWidth();
                                return index === l - 1 && !resolved ? "70%" : resolved;
                            }, height: props.height, animated: props.animated }, index))) }));
                }
                return (_jsx("div", { class: () => `skeleton-base skeleton-${v} ${animated() ? "skeleton-animated" : ""} ${customClass()}`, style: baseStyle }));
            }, _jsx("style", { children: `
        .skeleton-base {
          display: inline-block;
          background-color: #e2e8f0;
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
            rgba(255, 255, 255, 0.4) 20%,
            rgba(255, 255, 255, 0.6) 60%,
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

        @media (prefers-color-scheme: dark) {
          .skeleton-base {
            background-color: #2d3748;
          }
          .skeleton-animated::after {
            background-image: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 0,
              rgba(255, 255, 255, 0.05) 20%,
              rgba(255, 255, 255, 0.1) 60%,
              rgba(255, 255, 255, 0)
            );
          }
        }
      ` })] }));
};
//# sourceMappingURL=SkeletonLoader.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function LogInIcon({ onMouseEnter, onMouseLeave, className, size = 28, duration = 400, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const arrowRef = ref(null);
    const lineRef = ref(null);
    const getTargets = () => collectElements(arrowRef.current, lineRef.current);
    const startAnimation = () => {
        if (!arrowRef.current || !lineRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(arrowRef.current, [
                { transform: "translateX(0px)" },
                { transform: "translateX(3px)" },
                { transform: "translateX(0px)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(lineRef.current, [
                { transform: "translateX(0px)" },
                { transform: "translateX(3px)" },
                { transform: "translateX(0px)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { fill: "none", height: size, stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", viewBox: "0 0 24 24", width: size, xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }), _jsx("polyline", { ref: arrowRef, points: "10 17 15 12 10 7", style: { transformBox: "fill-box", transformOrigin: "center" } }), _jsx("line", { ref: lineRef, x1: "3", x2: "15", y1: "12", y2: "12", style: { transformBox: "fill-box", transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=LogInIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function AArrowDownIcon({ onMouseEnter, onMouseLeave, className, size = 28, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const letterStrokeRef = ref(null);
    const letterShapeRef = ref(null);
    const arrowStemRef = ref(null);
    const arrowHeadRef = ref(null);
    const getTargets = () => collectElements(letterStrokeRef.current, letterShapeRef.current, arrowStemRef.current, arrowHeadRef.current);
    const startAnimation = () => {
        if (!letterStrokeRef.current || !letterShapeRef.current || !arrowStemRef.current || !arrowHeadRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(letterStrokeRef.current, [
                { opacity: 0.15, transform: "translateY(-2px) scale(0.86)" },
                { opacity: 1, transform: "translateY(0px) scale(1)" }
            ], duration, 0, "cubic-bezier(.2,.9,.2,1)"),
            () => createIconAnimation(letterShapeRef.current, [
                { opacity: 0.15, transform: "translateY(-2px) scale(0.86)" },
                { opacity: 1, transform: "translateY(0px) scale(1)" }
            ], duration, 40, "cubic-bezier(.2,.9,.2,1)"),
            () => createIconAnimation(arrowStemRef.current, [
                { opacity: 0, transform: "translateY(-10px)" },
                { opacity: 1, transform: "translateY(0px)" }
            ], duration, 120, "cubic-bezier(.2,.88,.22,1)"),
            () => createIconAnimation(arrowHeadRef.current, [
                { opacity: 0, transform: "translateY(-10px)" },
                { opacity: 1, transform: "translateY(0px)" }
            ], duration, 160, "cubic-bezier(.2,.88,.22,1)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(160, duration - 80));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { fill: "none", height: size, stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", viewBox: "0 0 24 24", width: size, xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { ref: letterStrokeRef, d: "M3.5 13h6", style: { transformBox: "fill-box", transformOrigin: "center" } }), _jsx("path", { ref: letterShapeRef, d: "m2 16 4.5-9 4.5 9", style: { transformBox: "fill-box", transformOrigin: "center" } }), _jsx("path", { ref: arrowStemRef, d: "M18 7v9", style: { transformBox: "fill-box", transformOrigin: "center" } }), _jsx("path", { ref: arrowHeadRef, d: "m14 12 4 4 4-4", style: { transformBox: "fill-box", transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=AArrowDownIcon.js.map
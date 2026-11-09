import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function AxeIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1000, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const getTargets = () => collectElements(svgRef.current);
    const startAnimation = () => {
        if (!svgRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(svgRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-20deg)" },
                { transform: "rotate(15deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "axe", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "bottom left" }, children: [_jsx("path", { d: "m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" }), _jsx("path", { d: "M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z" })] }) }));
}
//# sourceMappingURL=AxeIcon.js.map
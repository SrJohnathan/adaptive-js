import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function SnowflakeIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 400, animateOnHover = true, iconRef, ...props }) {
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
                { transform: "rotate(-5deg)" },
                { transform: "rotate(5deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(5deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "snowflake", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "m10 20-1.25-2.5L6 18" }), _jsx("path", { d: "M10 4 8.75 6.5 6 6" }), _jsx("path", { d: "m14 20 1.25-2.5L18 18" }), _jsx("path", { d: "m14 4 1.25 2.5L18 6" }), _jsx("path", { d: "m17 21-3-6h-4" }), _jsx("path", { d: "m17 3-3 6 1.5 3" }), _jsx("path", { d: "M2 12h6.5L10 9" }), _jsx("path", { d: "m20 10-1.5 2 1.5 2" }), _jsx("path", { d: "M22 12h-6.5L14 15" }), _jsx("path", { d: "m4 10 1.5 2L4 14" }), _jsx("path", { d: "m7 21 3-6-1.5-3" }), _jsx("path", { d: "m7 3 3 6h4" })] }) }));
}
//# sourceMappingURL=SnowflakeIcon.js.map
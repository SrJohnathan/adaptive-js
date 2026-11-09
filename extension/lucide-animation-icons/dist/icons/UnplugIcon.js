import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function UnplugIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const getTargets = () => collectElements(svgRef.current);
    const startAnimation = () => {
        if (!svgRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(svgRef.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(-2px, 2px)" },
                { transform: "translate(0, 0)" }
            ], duration, 0, "cubic-bezier(0.25, 0.8, 0.25, 1)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "unplug", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("g", { class: "line-1", children: _jsx("path", { d: "M19 5l3 -3" }) }), _jsx("g", { class: "line-2", children: _jsx("path", { d: "m2 22 3-3" }) }), _jsx("path", { class: "socket", d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" }), _jsx("g", { class: "spark-1", children: _jsx("path", { d: "M7.5 13.5l2.5 -2.5" }) }), _jsx("g", { class: "spark-2", children: _jsx("path", { d: "M10.5 16.5l2.5 -2.5" }) }), _jsx("path", { class: "plug", d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z" })] }) }));
}
//# sourceMappingURL=UnplugIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function MonitorCogIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
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
                { transform: "rotate(180deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "monitor-cog", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "18px 6px" }, children: [_jsx("path", { d: "M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" }), _jsx("path", { d: "M8 21h8" }), _jsx("path", { d: "M12 17v4" }), _jsxs("g", { class: "cog-group", children: [_jsx("path", { d: "m15.2 4.9-.9-.4" }), _jsx("path", { d: "m15.2 7.1-.9.4" }), _jsx("path", { d: "m16.9 3.2-.4-.9" }), _jsx("path", { d: "m16.9 8.8-.4.9" }), _jsx("path", { d: "m19.5 2.3-.4.9" }), _jsx("path", { d: "m19.5 9.7-.4-.9" }), _jsx("path", { d: "m21.7 4.5-.9.4" }), _jsx("path", { d: "m21.7 7.5-.9-.4" }), _jsx("circle", { cx: "18", cy: "6", r: "3" })] })] }) }));
}
//# sourceMappingURL=MonitorCogIcon.js.map
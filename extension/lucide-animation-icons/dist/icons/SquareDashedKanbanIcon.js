import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function SquareDashedKanbanIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 700, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const getTargets = () => collectElements(svgRef.current);
    const startAnimation = () => {
        if (!svgRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(svgRef.current, [
                { strokeDashoffset: "0", opacity: "1" },
                { strokeDashoffset: "20", opacity: "0" },
                { strokeDashoffset: "0", opacity: "1" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "square-dashed-kanban", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M8 7v7", class: "column column-0" }), _jsx("path", { d: "M12 7v4", class: "column column-1" }), _jsx("path", { d: "M16 7v9", class: "column column-2" }), _jsx("path", { d: "M5 3a2 2 0 0 0-2 2" }), _jsx("path", { d: "M9 3h1" }), _jsx("path", { d: "M14 3h1" }), _jsx("path", { d: "M19 3a2 2 0 0 1 2 2" }), _jsx("path", { d: "M21 9v1" }), _jsx("path", { d: "M21 14v1" }), _jsx("path", { d: "M21 19a2 2 0 0 1-2 2" }), _jsx("path", { d: "M14 21h1" }), _jsx("path", { d: "M9 21h1" }), _jsx("path", { d: "M5 21a2 2 0 0 1-2-2" }), _jsx("path", { d: "M3 14v1" }), _jsx("path", { d: "M3 9v1" })] }) }));
}
//# sourceMappingURL=SquareDashedKanbanIcon.js.map
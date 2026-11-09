import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function KeyboardOffIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const getTargets = () => collectElements(svgRef.current);
    const startAnimation = () => {
        if (!svgRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(svgRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(-7%)" },
                { transform: "translateX(7%)" },
                { transform: "translateX(-7%)" },
                { transform: "translateX(7%)" },
                { transform: "translateX(0)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "keyboard-off", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M 20 4 A2 2 0 0 1 22 6" }), _jsx("path", { d: "M 22 6 L 22 16.41" }), _jsx("path", { d: "M 7 16 L 16 16" }), _jsx("path", { d: "M 9.69 4 L 20 4" }), _jsx("path", { d: "M14 8h.01" }), _jsx("path", { d: "M18 8h.01" }), _jsx("path", { d: "m2 2 20 20" }), _jsx("path", { d: "M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2" }), _jsx("path", { d: "M6 8h.01" }), _jsx("path", { d: "M8 12h.01" })] }) }));
}
//# sourceMappingURL=KeyboardOffIcon.js.map
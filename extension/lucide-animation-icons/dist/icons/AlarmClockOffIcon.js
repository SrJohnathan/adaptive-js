import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function AlarmClockOffIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
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
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "alarm-clock-off", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M6.87 6.87a8 8 0 1 0 11.26 11.26" }), _jsx("path", { d: "M19.9 14.25a8 8 0 0 0-9.15-9.15" }), _jsx("path", { d: "m22 6-3-3" }), _jsx("path", { d: "M6.26 18.67 4 21" }), _jsx("path", { d: "m2 2 20 20" }), _jsx("path", { d: "M4 4 2 6" })] }) }));
}
//# sourceMappingURL=AlarmClockOffIcon.js.map
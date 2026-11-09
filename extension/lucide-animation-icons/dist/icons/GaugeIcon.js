import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function GaugeIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const element0Ref = ref(null);
    const getTargets = () => collectElements(element0Ref.current);
    const startAnimation = () => {
        if (!element0Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(element0Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(72deg)" },
                { transform: "rotate(0deg)" }
            ], 600, 0, "cubic-bezier(0.16, 1.4, 0.3, 1)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "gauge", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "12px 14px" }, children: [_jsx("path", { d: "m12 14 4-4", class: "gauge-needle" }), _jsx("path", { d: "M3.34 19a10 10 0 1 1 17.32 0" })] }) }));
}
//# sourceMappingURL=GaugeIcon.js.map
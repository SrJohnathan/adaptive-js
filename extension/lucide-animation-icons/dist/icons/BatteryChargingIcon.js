import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BatteryChargingIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const chargingPathRef = ref(null);
    const getTargets = () => collectElements(chargingPathRef.current);
    const startAnimation = () => {
        if (!chargingPathRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(chargingPathRef.current, [
                { opacity: 1 },
                { opacity: 0.1 },
                { opacity: 1 },
                { opacity: 0.1 },
                { opacity: 1 },
                { opacity: 0.1 },
                { opacity: 1 }
            ], duration, 0, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "battery-charging", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" }), _jsx("path", { d: "M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" }), _jsx("path", { ref: chargingPathRef, d: "m11 7-3 5h4l-3 5" }), _jsx("line", { x1: "22", x2: "22", y1: "11", y2: "13" })] }) }));
}
//# sourceMappingURL=BatteryChargingIcon.js.map
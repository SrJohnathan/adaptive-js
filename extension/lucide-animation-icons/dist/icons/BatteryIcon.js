import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BatteryIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const batteryRef = ref(null);
    const lineRef = ref(null);
    const getTargets = () => collectElements(batteryRef.current, lineRef.current);
    const startAnimation = () => {
        if (!batteryRef.current || !lineRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(batteryRef.current, [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ], 500, 0, "ease"),
            () => createIconAnimation(lineRef.current, [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ], 500, 0, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "battery", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: batteryRef, width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }), _jsx("line", { ref: lineRef, x1: "22", x2: "22", y1: "11", y2: "13" })] }) }));
}
//# sourceMappingURL=BatteryIcon.js.map
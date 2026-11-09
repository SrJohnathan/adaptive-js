import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BatteryFullIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const bar1Ref = ref(null);
    const bar2Ref = ref(null);
    const bar3Ref = ref(null);
    const getTargets = () => collectElements(bar1Ref.current, bar2Ref.current, bar3Ref.current);
    const startAnimation = () => {
        if (!bar1Ref.current || !bar2Ref.current || !bar3Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(bar1Ref.current, [
                { opacity: 0 },
                { opacity: 1 }
            ], 300, 400, "ease"),
            () => createIconAnimation(bar2Ref.current, [
                { opacity: 0 },
                { opacity: 1 }
            ], 300, 800, "ease"),
            () => createIconAnimation(bar3Ref.current, [
                { opacity: 0 },
                { opacity: 1 }
            ], 300, 1200, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "battery-full", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { width: "16", height: "10", x: "2", y: "7", rx: "2", ry: "2" }), _jsx("line", { x1: "22", x2: "22", y1: "11", y2: "13" }), _jsx("line", { ref: bar1Ref, x1: "6", x2: "6", y1: "11", y2: "13", style: { opacity: 1, transformOrigin: "center" } }), _jsx("line", { ref: bar2Ref, x1: "10", x2: "10", y1: "11", y2: "13", style: { opacity: 1, transformOrigin: "center" } }), _jsx("line", { ref: bar3Ref, x1: "14", x2: "14", y1: "11", y2: "13", style: { opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=BatteryFullIcon.js.map
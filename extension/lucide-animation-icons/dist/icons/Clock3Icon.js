import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function Clock3({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const minuteRef = ref(null);
    const hourRef = ref(null);
    const getTargets = () => collectElements(minuteRef.current, hourRef.current);
    const startAnimation = () => {
        if (!minuteRef.current || !hourRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(minuteRef.current, [
                { transform: "rotate(0)" },
                { transform: "rotate(360deg)" }
            ], 600, 0, "cubic-bezier(0.4, 0, 0.2, 1)"),
            () => createIconAnimation(hourRef.current, [
                { transform: "rotate(0)" },
                { transform: "rotate(30deg)" }
            ], 500, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "clock-3", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { ref: minuteRef, x1: "12", y1: "12", x2: "12", y2: "6", style: { transformOrigin: "center" } }), _jsx("line", { ref: hourRef, x1: "12", y1: "12", x2: "16", y2: "12", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=Clock3Icon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function TerminalIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const cursorRef = ref(null);
    const getTargets = () => collectElements(cursorRef.current);
    const startAnimation = () => {
        if (!cursorRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(cursorRef.current, [
                { opacity: 1 },
                { opacity: 0.2 },
                { opacity: 1 }
            ], duration, 0, "linear")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "terminal", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("polyline", { points: "4 17 10 11 4 5" }), _jsx("line", { x1: "9", x2: "21", y1: "11", y2: "11" }), _jsx("path", { ref: cursorRef, d: "M21 15h.01", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=TerminalIcon.js.map
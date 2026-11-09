import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CalendarCheckIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const checkPathRef = ref(null);
    const getTargets = () => collectElements(checkPathRef.current);
    const startAnimation = () => {
        if (!checkPathRef.current) {
            return;
        }
        const pathLength = checkPathRef.current.getTotalLength();
        checkPathRef.current.style.strokeDasharray = `${pathLength}`;
        checkPathRef.current.style.strokeDashoffset = `${pathLength}`;
        controller.current?.start([
            () => createIconAnimation(checkPathRef.current, [
                { strokeDashoffset: `${pathLength}`, opacity: 0 },
                { strokeDashoffset: `${pathLength}`, opacity: 0 },
                { strokeDashoffset: "0", opacity: 1 }
            ], 500, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "calendar-check", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "M8 2v4" }), _jsx("path", { d: "M16 2v4" }), _jsx("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }), _jsx("path", { d: "M3 10h18" }), _jsx("path", { ref: checkPathRef, d: "m9 16 2 2 4-4" })] }) }));
}
//# sourceMappingURL=CalendarCheckIcon.js.map
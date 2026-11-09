import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function AlarmClockCheckIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
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
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "alarm-clock-check", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("circle", { cx: "12", cy: "13", r: "8" }), _jsx("path", { d: "M5 3 2 6" }), _jsx("path", { d: "m22 6-3-3" }), _jsx("path", { d: "M6.38 18.7 4 21" }), _jsx("path", { d: "M17.64 18.67 20 21" }), _jsx("path", { ref: checkPathRef, d: "m9 13 2 2 4-4", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=AlarmClockCheckIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CalendarDaysIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const dots = Array.from({ length: 6 }, () => ref(null));
    const getTargets = () => collectElements(...dots.map(r => r.current));
    const startAnimation = () => {
        if (!dots[0].current)
            return;
        controller.current?.start(dots.map((r, i) => () => createIconAnimation(r.current, [
            { opacity: 1 },
            { opacity: 0.3 },
            { opacity: 1 }
        ], 800, i * 170, "ease")));
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "calendar-days", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M8 2v4" }), _jsx("path", { d: "M16 2v4" }), _jsx("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }), _jsx("path", { d: "M3 10h18" }), [
                    { cx: 8, cy: 14 },
                    { cx: 12, cy: 14 },
                    { cx: 16, cy: 14 },
                    { cx: 8, cy: 18 },
                    { cx: 12, cy: 18 },
                    { cx: 16, cy: 18 }
                ].map((pos, i) => (_jsx("circle", { ref: dots[i], cx: pos.cx, cy: pos.cy, r: "1", fill: color, stroke: "none", style: { transformOrigin: "center" } }, i)))] }) }));
}
//# sourceMappingURL=CalendarDaysIcon.js.map
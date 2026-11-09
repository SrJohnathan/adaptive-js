import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
const DOTS = [
    { cx: 12, cy: 12 },
    { cx: 12, cy: 5 },
    { cx: 12, cy: 19 }
];
export function MoreVerticalIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const circles = DOTS.map(() => ref(null));
    const getTargets = () => collectElements(...circles.map((r) => r.current));
    const startAnimation = () => {
        if (!circles[0].current)
            return;
        controller.current?.start(circles.map((r, i) => () => r.current
            ? createIconAnimation(r.current, [
                { transform: "scale(1)" },
                { transform: "scale(1.15)", offset: 0.4 },
                { transform: "scale(1)" }
            ], duration, i * 80, "cubic-bezier(0.34, 1.56, 0.64, 1)")
            : null));
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "more vertical", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: DOTS.map((pos, i) => (_jsx("circle", { ref: circles[i], cx: pos.cx, cy: pos.cy, r: "1", style: { transformOrigin: "center" } }, i))) }) }));
}
//# sourceMappingURL=MoreVerticalIcon.js.map
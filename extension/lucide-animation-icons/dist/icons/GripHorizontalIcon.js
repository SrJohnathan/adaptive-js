import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function GripHorizontalIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const circles = Array.from({ length: 6 }, () => ref(null));
    const getTargets = () => collectElements(...circles.map(r => r.current));
    const startAnimation = () => {
        if (!circles[0].current)
            return;
        controller.current?.start(circles.map((r, i) => () => createIconAnimation(r.current, [
            { opacity: 1 },
            { opacity: 0 },
            { opacity: 1 }
        ], 800, i * 50, "ease-in-out")));
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "grip-horizontal", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [
                { cx: 12, cy: 9 },
                { cx: 19, cy: 9 },
                { cx: 5, cy: 9 },
                { cx: 12, cy: 15 },
                { cx: 19, cy: 15 },
                { cx: 5, cy: 15 }
            ].map((pos, i) => (_jsx("circle", { ref: circles[i], cx: pos.cx, cy: pos.cy, r: "1", style: { transformOrigin: "center" } }, i))) }) }));
}
//# sourceMappingURL=GripHorizontalIcon.js.map
import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function AudioLinesIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const lines = Array.from({ length: 6 }, () => ref(null));
    const getTargets = () => collectElements(...lines.map(r => r.current));
    const startAnimation = () => {
        if (!lines[0].current)
            return;
        controller.current?.start(lines.map((r, i) => () => createIconAnimation(r.current, [
            { y1: 10, y2: 13 },
            { y1: 5, y2: 18 },
            { y1: 8, y2: 15 },
            { y1: 6, y2: 17 },
            { y1: 10, y2: 13 }
        ], 1500, i * 50, "ease-out")));
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "audio-lines", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [
                { x1: 2, y1: 10, x2: 2, y2: 13 },
                { x1: 6, y1: 6, x2: 6, y2: 17 },
                { x1: 10, y1: 3, x2: 10, y2: 21 },
                { x1: 14, y1: 8, x2: 14, y2: 15 },
                { x1: 18, y1: 5, x2: 18, y2: 18 },
                { x1: 22, y1: 10, x2: 22, y2: 13 }
            ].map((line, i) => (_jsx("line", { ref: lines[i], x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2, style: { transformOrigin: "center" } }, i))) }) }));
}
//# sourceMappingURL=AudioLinesIcon.js.map
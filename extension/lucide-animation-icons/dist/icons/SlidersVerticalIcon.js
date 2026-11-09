import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function SlidersVerticalIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 400, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const lines = Array.from({ length: 9 }, () => ref(null));
    const getTargets = () => collectElements(...lines.map(r => r.current));
    const startAnimation = () => {
        if (!lines[0].current)
            return;
        controller.current?.start(lines.map((r, i) => {
            const start = i === 0 ? 14 : i === 1 ? 10 : i === 2 ? 14 : i === 3 ? 12 : i === 4 ? 8 : i === 5 ? 8 : i === 6 ? 12 : i === 7 ? 16 : 16;
            const end = i === 0 ? 10 : i === 1 ? 5 : i === 2 ? 9 : i === 3 ? 18 : i === 4 ? 13 : i === 5 ? 14 : i === 6 ? 4 : i === 7 ? 8 : 8;
            const prop = i <= 2 ? 'y2' : i <= 5 ? 'y1' : 'y1';
            return () => createIconAnimation(lines[i].current, [
                { [i <= 2 ? 'y2' : 'y1']: start },
                { [i <= 2 ? 'y2' : 'y1']: end }
            ], duration, 0, "cubic-bezier(0.34, 1.56, 0.64, 1)");
        }));
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "sliders-vertical", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [
                { x1: 4, y1: 21, x2: 4, y2: 14 },
                { x1: 4, y1: 10, x2: 4, y2: 3 },
                { x1: 2, y1: 14, x2: 6, y2: 14 },
                { x1: 12, y1: 21, x2: 12, y2: 12 },
                { x1: 12, y1: 8, x2: 12, y2: 3 },
                { x1: 10, y1: 8, x2: 14, y2: 14 },
                { x1: 20, y1: 3, x2: 20, y2: 12 },
                { x1: 20, y1: 16, x2: 20, y2: 21 },
                { x1: 18, y1: 16, x2: 22, y2: 22 }
            ].map((line, i) => (_jsx("line", { ref: lines[i], x1: line.x1, y1: line.y1, x2: line.x2, y2: line.y2, style: { transformOrigin: "center" } }, i))) }) }));
}
//# sourceMappingURL=SlidersVerticalIcon.js.map
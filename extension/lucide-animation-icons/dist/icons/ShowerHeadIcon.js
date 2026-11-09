import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ShowerHeadIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1000, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const drops = Array.from({ length: 7 }, () => ref(null));
    const getTargets = () => collectElements(...drops.map(r => r.current));
    const startAnimation = () => {
        if (!drops[0].current)
            return;
        controller.current?.start(drops.map((r, i) => () => createIconAnimation(r.current, [
            { opacity: 1 },
            { opacity: 0.2 },
            { opacity: 1 }
        ], 1000, i * 200, "ease-in-out")));
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    const dropPaths = [
        { d: "M14 17v.01", delay: 0 },
        { d: "M10 16v.01", delay: 0.2 },
        { d: "M13 13v.01", delay: 0.4 },
        { d: "M16 10v.01", delay: 0.6 },
        { d: "M11 20v.01", delay: 0.8 },
        { d: "M17 14v.01", delay: 1.0 },
        { d: "M20 11v.01", delay: 1.2 }
    ];
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "shower-head", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "m4 4 2.5 2.5" }), _jsx("path", { d: "M13.5 6.5a4.95 4.95 0 0 0-7 7" }), _jsx("path", { d: "M15 5 5 15" }), _jsx("g", { class: "drops", children: dropPaths.map((drop, i) => (_jsx("path", { ref: drops[i], d: drop.d, style: { transformOrigin: "center", opacity: 1 } }, i))) })] }) }));
}
//# sourceMappingURL=ShowerHeadIcon.js.map
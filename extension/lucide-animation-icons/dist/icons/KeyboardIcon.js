import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function KeyboardIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const keys = Array.from({ length: 8 }, () => ref(null));
    const getTargets = () => collectElements(...keys.map(r => r.current));
    const startAnimation = () => {
        if (!keys[0].current)
            return;
        controller.current?.start(keys.map((r, i) => () => createIconAnimation(r.current, [
            { opacity: 1 },
            { opacity: 0.2 },
            { opacity: 1 }
        ], 1500, i * 50, "ease-in-out")));
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    const keyboardPaths = [
        { d: 'M10 8h.01', delay: 0 },
        { d: 'M12 12h.01', delay: 0.05 },
        { d: 'M14 8h.01', delay: 0.1 },
        { d: 'M16 12h.01', delay: 0.15 },
        { d: 'M18 8h.01', delay: 0.2 },
        { d: 'M6 8h.01', delay: 0.25 },
        { d: 'M7 16h10', delay: 0.3 },
        { d: 'M8 12h.01', delay: 0.35 }
    ];
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "keyboard", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }), keyboardPaths.map((k, i) => (_jsx("path", { ref: keys[i], d: k.d, style: { transformOrigin: "center", opacity: 1 } }, k.d)))] }) }));
}
//# sourceMappingURL=KeyboardIcon.js.map
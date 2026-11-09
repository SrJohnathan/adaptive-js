import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function TextAlignCenterIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const lines = Array.from({ length: 4 }, () => ref(null));
    const getTargets = () => collectElements(...lines.map(r => r.current));
    const startAnimation = () => {
        if (!lines[0].current)
            return;
        controller.current?.start(lines.map((r, i) => () => createIconAnimation(r.current, [
            { transform: "translateX(0)" },
            { transform: "translateX(-5px)" },
            { transform: "translateX(0)" }
        ], 500, i * 50, "ease-in-out")));
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "text-align-center", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { ref: lines[0], d: "M21 10H3", style: { transformOrigin: "center" } }), _jsx("path", { ref: lines[1], d: "M21 6H3", style: { transformOrigin: "center" } }), _jsx("path", { ref: lines[2], d: "M10 14H7", style: { transformOrigin: "center" } }), _jsx("path", { ref: lines[3], d: "M10 18H7", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=TextAlignCenterIcon.js.map
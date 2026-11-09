import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CalendarX2Icon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const diag1Ref = ref(null);
    const diag2Ref = ref(null);
    const getTargets = () => collectElements(diag1Ref.current, diag2Ref.current);
    const startAnimation = () => {
        if (!diag1Ref.current || !diag2Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(diag1Ref.current, [
                { opacity: 0, strokeDashoffset: "8" },
                { opacity: 1, strokeDashoffset: "8" },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 0, "ease-out"),
            () => createIconAnimation(diag2Ref.current, [
                { opacity: 0, strokeDashoffset: "8" },
                { opacity: 1, strokeDashoffset: "8" },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 250, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "calendar-x-2", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "M8 2v4" }), _jsx("path", { d: "M16 2v4" }), _jsx("rect", { width: "18", height: "18", x: "3", y: "4", rx: "2" }), _jsx("path", { d: "M3 10h18" }), _jsx("path", { ref: diag1Ref, d: "m14 14-4 4", style: { strokeDasharray: "8", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } }), _jsx("path", { ref: diag2Ref, d: "m10 14 4 4", style: { strokeDasharray: "8", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=CalendarX2Icon.js.map
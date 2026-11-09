import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function AccessibilityIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1400, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const group1Ref = ref(null);
    const group2Ref = ref(null);
    const path3Ref = ref(null);
    const getTargets = () => collectElements(group1Ref.current, group2Ref.current, path3Ref.current);
    const startAnimation = () => {
        if (!group1Ref.current || !group2Ref.current || !path3Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(group1Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(5deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(0deg)" }
            ], 800, 0, "ease-in-out"),
            () => createIconAnimation(group2Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(360deg)" }
            ], 1000, 400, "ease-in-out"),
            () => createIconAnimation(path3Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-60deg)" },
                { transform: "rotate(0deg)" }
            ], 400, 200, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "accessibility", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("circle", { cx: "16", cy: "4", r: "1" }), _jsxs("g", { ref: group1Ref, style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M18,19l1-7-6,1" }), _jsx("path", { d: "M8,5l5.5,3-2.4,3.5" }), _jsx("path", { ref: path3Ref, d: "M8 5 L5 8", style: { transformOrigin: "8px 5px" } })] }), _jsxs("g", { ref: group2Ref, style: { transformOrigin: "9px 16px" }, children: [_jsx("path", { d: "M4.2,14.5c-.8,2.6.7,5.4,3.3,6.2,1.2.4,2.4.3,3.6-.2" }), _jsx("path", { d: "M13.8,17.5c.8-2.6-.7-5.4-3.3-6.2-1.2-.4-2.4-.3-3.6.2" })] }), _jsx("path", { d: "M13,13.1c-.5-.7-1.1-1.2-1.9-1.6" })] }) }));
}
//# sourceMappingURL=AccessibilityIcon.js.map
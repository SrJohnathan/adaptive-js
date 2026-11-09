import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function MaximizeIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const element0Ref = ref(null);
    const element1Ref = ref(null);
    const element2Ref = ref(null);
    const element3Ref = ref(null);
    const getTargets = () => collectElements(element0Ref.current, element1Ref.current, element2Ref.current, element3Ref.current);
    const startAnimation = () => {
        if (!element0Ref.current || !element1Ref.current || !element2Ref.current || !element3Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(element0Ref.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(2px, 2px)" },
                { transform: "translate(0, 0)" }
            ], 300, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)"),
            () => createIconAnimation(element1Ref.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(-2px, 2px)" },
                { transform: "translate(0, 0)" }
            ], 300, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)"),
            () => createIconAnimation(element2Ref.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(2px, -2px)" },
                { transform: "translate(0, 0)" }
            ], 300, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)"),
            () => createIconAnimation(element3Ref.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(-2px, -2px)" },
                { transform: "translate(0, 0)" }
            ], 300, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "maximize", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M8 3H5a2 2 0 0 0-2 2v3" }), _jsx("path", { d: "M21 8V5a2 2 0 0 0-2-2h-3" }), _jsx("path", { d: "M3 16v3a2 2 0 0 0 2 2h3" }), _jsx("path", { d: "M16 21h3a2 2 0 0 0 2-2v-3" })] }) }));
}
//# sourceMappingURL=MaximizeIcon.js.map
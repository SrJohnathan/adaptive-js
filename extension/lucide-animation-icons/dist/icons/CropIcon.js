import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CropIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const element0Ref = ref(null);
    const element1Ref = ref(null);
    const getTargets = () => collectElements(element0Ref.current, element1Ref.current);
    const startAnimation = () => {
        if (!element0Ref.current || !element1Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(element0Ref.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(1px, -1px)" },
                { transform: "translate(0, 0)" }
            ], 300, 0, "ease"),
            () => createIconAnimation(element1Ref.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(-1px, 1px)" },
                { transform: "translate(0, 0)" }
            ], 300, 0, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "crop", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M6 2v14a2 2 0 0 0 2 2h14" }), _jsx("path", { d: "M18 22V8a2 2 0 0 0-2-2H2" })] }) }));
}
//# sourceMappingURL=CropIcon.js.map
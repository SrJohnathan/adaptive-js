import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CircleQuestionMarkIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const pathRef = ref(null);
    const getTargets = () => collectElements(pathRef.current);
    const startAnimation = () => {
        if (!pathRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(pathRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-10deg)" },
                { transform: "rotate(10deg)" },
                { transform: "rotate(-10deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "circle-question-mark", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsxs("g", { ref: pathRef, style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }), _jsx("path", { d: "M12 17h.01" })] })] }) }));
}
//# sourceMappingURL=CircleQuestionMarkIcon.js.map
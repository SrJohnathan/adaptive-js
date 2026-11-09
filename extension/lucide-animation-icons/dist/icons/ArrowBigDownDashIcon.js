import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ArrowBigDownDashIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const dashRef = ref(null);
    const arrowRef = ref(null);
    const getTargets = () => collectElements(dashRef.current, arrowRef.current);
    const startAnimation = () => {
        if (!dashRef.current || !arrowRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(dashRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(1px)" },
                { transform: "translateY(0)" }
            ], 200, 0, "ease-out"),
            () => createIconAnimation(arrowRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(3px)" },
                { transform: "translateY(0)" }
            ], 200, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "arrow-big-down-dash", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { ref: dashRef, d: "M15 5H9", style: { transformOrigin: "center" } }), _jsx("path", { ref: arrowRef, d: "M15 9v3h4l-7 7-7-7h4V9z", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=ArrowBigDownDashIcon.js.map
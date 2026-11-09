import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ChevronDownIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const pathRef = ref(null);
    const getTargets = () => collectElements(pathRef.current);
    const startAnimation = () => {
        if (!pathRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(pathRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(3px)" },
                { transform: "translateY(0)" }
            ], 200, 0, "ease-in")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "chevron-down", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { ref: pathRef, d: "m6 9 6 6 6-6", style: { transformOrigin: "center" } }) }) }));
}
//# sourceMappingURL=ChevronDownIcon.js.map
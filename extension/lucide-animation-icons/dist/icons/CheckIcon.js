import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CheckIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const checkPathRef = ref(null);
    const getTargets = () => collectElements(checkPathRef.current);
    const startAnimation = () => {
        if (!checkPathRef.current) {
            return;
        }
        const pathLength = checkPathRef.current.getTotalLength();
        checkPathRef.current.style.strokeDasharray = `${pathLength}`;
        checkPathRef.current.style.strokeDashoffset = `${pathLength}`;
        controller.current?.start([
            () => createIconAnimation(checkPathRef.current, [
                { strokeDashoffset: `${pathLength}`, opacity: 0 },
                { strokeDashoffset: `${pathLength}`, opacity: 0 },
                { strokeDashoffset: "0", opacity: 1 }
            ], 500, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "check", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: _jsx("path", { ref: checkPathRef, d: "M4 12l5 5L20 6", style: { transformOrigin: "center" } }) }) }));
}
//# sourceMappingURL=CheckIcon.js.map
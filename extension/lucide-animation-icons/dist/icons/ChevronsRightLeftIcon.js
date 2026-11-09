import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ChevronsRightLeftIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const rightRef = ref(null);
    const leftRef = ref(null);
    const getTargets = () => collectElements(rightRef.current, leftRef.current);
    const startAnimation = () => {
        if (!rightRef.current || !leftRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(rightRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(3px)" },
                { transform: "translateX(0)" }
            ], 200, 0, "ease-in"),
            () => createIconAnimation(leftRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(-3px)" },
                { transform: "translateX(0)" }
            ], 200, 0, "ease-in")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "chevrons-right-left", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { ref: rightRef, d: "m20 17-5-5 5-5", style: { transformOrigin: "center" } }), _jsx("path", { ref: leftRef, d: "m4 17 5-5-5-5", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=ChevronsRightLeftIcon.js.map
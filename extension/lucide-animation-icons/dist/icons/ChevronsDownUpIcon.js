import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ChevronsDownUpIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const upRef = ref(null);
    const downRef = ref(null);
    const getTargets = () => collectElements(upRef.current, downRef.current);
    const startAnimation = () => {
        if (!upRef.current || !downRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(upRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(-3px)" },
                { transform: "translateY(0)" }
            ], 200, 0, "ease-in"),
            () => createIconAnimation(downRef.current, [
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
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "chevrons-down-up", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { ref: upRef, d: "m7 20 5-5 5 5", style: { transformOrigin: "center" } }), _jsx("path", { ref: downRef, d: "m7 4 5 5 5-5", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=ChevronsDownUpIcon.js.map
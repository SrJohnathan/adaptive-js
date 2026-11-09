import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BetweenVerticalStartIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 150, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const rectLeftRef = ref(null);
    const arrowRef = ref(null);
    const rectRightRef = ref(null);
    const getTargets = () => collectElements(rectLeftRef.current, arrowRef.current, rectRightRef.current);
    const startAnimation = () => {
        if (!rectLeftRef.current || !arrowRef.current || !rectRightRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(rectLeftRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(-1px)" },
                { transform: "translateX(0)" }
            ], duration, 0, "ease-in"),
            () => createIconAnimation(arrowRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(2px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in"),
            () => createIconAnimation(rectRightRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(1px)" },
                { transform: "translateX(0)" }
            ], duration, 0, "ease-in")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "between-vertical-start", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: rectLeftRef, width: "7", height: "13", x: "3", y: "8", rx: "1", style: { transformOrigin: "center" } }), _jsx("path", { ref: arrowRef, d: "m15 2-3 3-3-3", style: { transformOrigin: "center" } }), _jsx("rect", { ref: rectRightRef, width: "7", height: "13", x: "14", y: "8", rx: "1", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=BetweenVerticalStartIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BetweenHorizontalStartIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 150, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const rectTopRef = ref(null);
    const arrowRef = ref(null);
    const rectBottomRef = ref(null);
    const getTargets = () => collectElements(rectTopRef.current, arrowRef.current, rectBottomRef.current);
    const startAnimation = () => {
        if (!rectTopRef.current || !arrowRef.current || !rectBottomRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(rectTopRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(-1px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in"),
            () => createIconAnimation(arrowRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(2px)" },
                { transform: "translateX(0)" }
            ], duration, 0, "ease-in"),
            () => createIconAnimation(rectBottomRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(1px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "between-horizontal-start", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: rectTopRef, width: "13", height: "7", x: "8", y: "3", rx: "1", style: { transformOrigin: "center" } }), _jsx("path", { ref: arrowRef, d: "m2 9 3 3-3 3", style: { transformOrigin: "center" } }), _jsx("rect", { ref: rectBottomRef, width: "13", height: "7", x: "8", y: "14", rx: "1", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=BetweenHorizontalStartIcon.js.map
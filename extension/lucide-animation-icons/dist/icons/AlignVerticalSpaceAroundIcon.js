import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function AlignVerticalSpaceAroundIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const rectRef = ref(null);
    const topLineRef = ref(null);
    const bottomLineRef = ref(null);
    const getTargets = () => collectElements(rectRef.current, topLineRef.current, bottomLineRef.current);
    const startAnimation = () => {
        if (!rectRef.current || !topLineRef.current || !bottomLineRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(rectRef.current, [
                { transform: "scaleY(1)" },
                { transform: "scaleY(0.8)" },
                { transform: "scaleY(1)" }
            ], duration, 0, "cubic-bezier(0.16, 1, 0.3, 1)"),
            () => createIconAnimation(topLineRef.current, [
                { transform: "translateY(0) scaleX(1)" },
                { transform: "translateY(2px) scaleX(0.9)" },
                { transform: "translateY(0) scaleX(1)" }
            ], duration, 0, "cubic-bezier(0.16, 1, 0.3, 1)"),
            () => createIconAnimation(bottomLineRef.current, [
                { transform: "translateY(0) scaleX(1)" },
                { transform: "translateY(-2px) scaleX(0.9)" },
                { transform: "translateY(0) scaleX(1)" }
            ], duration, 0, "cubic-bezier(0.16, 1, 0.3, 1)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "align-vertical-space-around", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: rectRef, width: "10", height: "6", x: "7", y: "9", rx: "2", style: { transformOrigin: "center" } }), _jsx("path", { ref: topLineRef, d: "M22 4H2", style: { transformOrigin: "center" } }), _jsx("path", { ref: bottomLineRef, d: "M22 20H2", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=AlignVerticalSpaceAroundIcon.js.map
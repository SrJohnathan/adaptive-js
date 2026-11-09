import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function AlignHorizontalSpaceAroundIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const rectRef = ref(null);
    const leftLineRef = ref(null);
    const rightLineRef = ref(null);
    const getTargets = () => collectElements(rectRef.current, leftLineRef.current, rightLineRef.current);
    const startAnimation = () => {
        if (!rectRef.current || !leftLineRef.current || !rightLineRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(rectRef.current, [
                { transform: "scaleX(1)" },
                { transform: "scaleX(0.85)" },
                { transform: "scaleX(1)" }
            ], duration, 0, "cubic-bezier(0.16, 1, 0.3, 1)"),
            () => createIconAnimation(leftLineRef.current, [
                { transform: "translateX(0) scaleY(1)" },
                { transform: "translateX(2px) scaleY(0.9)" },
                { transform: "translateX(0) scaleY(1)" }
            ], duration, 0, "cubic-bezier(0.16, 1, 0.3, 1)"),
            () => createIconAnimation(rightLineRef.current, [
                { transform: "translateX(0) scaleY(1)" },
                { transform: "translateX(-2px) scaleY(0.9)" },
                { transform: "translateX(0) scaleY(1)" }
            ], duration, 0, "cubic-bezier(0.16, 1, 0.3, 1)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "align-horizontal-space-around", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: rectRef, width: "6", height: "10", x: "9", y: "7", rx: "2", style: { transformOrigin: "center" } }), _jsx("path", { ref: leftLineRef, d: "M4 22V2", style: { transformOrigin: "center" } }), _jsx("path", { ref: rightLineRef, d: "M20 22V2", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=AlignHorizontalSpaceAroundIcon.js.map
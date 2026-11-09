import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function UnfoldVerticalIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 400, animateOnHover = true, iconRef, ...props }) {
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
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)"),
            () => createIconAnimation(downRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(2px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "unfold-vertical", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsxs("g", { ref: upRef, style: { transformBox: "fill-box", transformOrigin: "center" }, children: [_jsx("path", { d: "m12 13 4 4-4 4" }), _jsx("path", { d: "M17 9h-2" })] }), _jsxs("g", { ref: downRef, style: { transformBox: "fill-box", transformOrigin: "center" }, children: [_jsx("path", { d: "M12 11v6" }), _jsx("path", { d: "M7 17h10" })] })] }) }));
}
//# sourceMappingURL=UnfoldVerticalIcon.js.map
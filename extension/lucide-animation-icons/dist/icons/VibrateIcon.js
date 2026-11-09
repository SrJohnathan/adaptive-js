import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function VibrateIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 400, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const rectRef = ref(null);
    const getTargets = () => collectElements(rectRef.current);
    const startAnimation = () => {
        if (!rectRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(rectRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(5deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(5deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "vibrate", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "m2 8 2 2-2 2 2 2-2 2" }), _jsx("path", { d: "m22 8-2 2 2 2-2 2 2 2" }), _jsx("rect", { ref: rectRef, width: "8", height: "14", x: "8", y: "5", rx: "1", style: { transformBox: "fill-box", transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=VibrateIcon.js.map
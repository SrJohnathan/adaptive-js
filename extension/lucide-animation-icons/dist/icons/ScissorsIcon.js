import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ScissorsIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const topRef = ref(null);
    const bottomRef = ref(null);
    const getTargets = () => collectElements(topRef.current, bottomRef.current);
    const startAnimation = () => {
        if (!topRef.current || !bottomRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(topRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-20deg)" },
                { transform: "rotate(0deg)" },
                { transform: "rotate(20deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)"),
            () => createIconAnimation(bottomRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(20deg)" },
                { transform: "rotate(0deg)" },
                { transform: "rotate(-20deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "scissors", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsxs("g", { ref: topRef, style: { transformBox: "fill-box", transformOrigin: "12px 12px" }, children: [_jsx("circle", { cx: "6", cy: "6", r: "3" }), _jsx("path", { d: "M8.12 8.12 12 12" }), _jsx("path", { d: "M14.8 14.8 20 20" })] }), _jsxs("g", { ref: bottomRef, style: { transformBox: "fill-box", transformOrigin: "12px 12px" }, children: [_jsx("circle", { cx: "6", cy: "18", r: "3" }), _jsx("path", { d: "M20 4 8.12 15.88" })] })] }) }));
}
//# sourceMappingURL=ScissorsIcon.js.map
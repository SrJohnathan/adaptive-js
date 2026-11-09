import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function FrameIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 170, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const topRef = ref(null);
    const leftRef = ref(null);
    const rightRef = ref(null);
    const bottomRef = ref(null);
    const getTargets = () => collectElements(topRef.current, leftRef.current, rightRef.current, bottomRef.current);
    const startAnimation = () => {
        if (!topRef.current || !leftRef.current || !rightRef.current || !bottomRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(topRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(4px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(bottomRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(-4px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(leftRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(-4px)" },
                { transform: "translateX(0)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(rightRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(4px)" },
                { transform: "translateX(0)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "frame", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { ref: topRef, x1: "6", x2: "6", y1: "2", y2: "22", style: { transformOrigin: "center" } }), _jsx("line", { ref: bottomRef, x1: "18", x2: "18", y1: "2", y2: "22", style: { transformOrigin: "center" } }), _jsx("line", { ref: leftRef, x1: "6", x2: "18", y1: "2", y2: "2", style: { transformOrigin: "center" } }), _jsx("line", { ref: rightRef, x1: "6", x2: "18", y1: "22", y2: "22", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=FrameIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function SparklesIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 750, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const groupRef = ref(null);
    const plusRef = ref(null);
    const circleRef = ref(null);
    const getTargets = () => collectElements(groupRef.current, plusRef.current, circleRef.current);
    const startAnimation = () => {
        if (!groupRef.current || !plusRef.current || !circleRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(groupRef.current, [
                { transform: "scale(1)" },
                { transform: "scale(0.9)" },
                { transform: "scale(1.05)" },
                { transform: "scale(1)" }
            ], 600, 0, "ease-in-out"),
            () => createIconAnimation(plusRef.current, [
                { opacity: 1, transform: "scale(1)" },
                { opacity: 0, transform: "scale(0)" },
                { opacity: 0, transform: "scale(0)" },
                { opacity: 1, transform: "scale(1)" }
            ], 750, 0, "ease-in-out"),
            () => createIconAnimation(circleRef.current, [
                { opacity: 1, transform: "scale(1)" },
                { opacity: 0, transform: "scale(0)" },
                { opacity: 0, transform: "scale(0)" },
                { opacity: 1, transform: "scale(1)" }
            ], 600, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "sparkles", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("g", { ref: groupRef, style: { transformBox: "fill-box", transformOrigin: "center" }, children: _jsx("path", { d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" }) }), _jsx("path", { ref: plusRef, d: "M20 2v4 M22 4h-4", style: { transformBox: "fill-box", transformOrigin: "center", opacity: 1, transform: "scale(1)" } }), _jsx("circle", { ref: circleRef, cx: "4", cy: "20", r: "2", style: { transformBox: "fill-box", transformOrigin: "center", opacity: 1, transform: "scale(1)" } })] }) }));
}
//# sourceMappingURL=SparklesIcon.js.map
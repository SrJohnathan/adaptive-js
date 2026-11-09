import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CctvIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 2000, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const bodyRef = ref(null);
    const dotRef = ref(null);
    const getTargets = () => collectElements(bodyRef.current, dotRef.current);
    const startAnimation = () => {
        if (!bodyRef.current || !dotRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(bodyRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-15deg)" },
                { transform: "rotate(10deg)" },
                { transform: "rotate(0deg)" }
            ], 2000, 0, "ease-in-out"),
            () => createIconAnimation(dotRef.current, [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ], 1000, 0, "linear")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "cctv", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsxs("g", { ref: bodyRef, style: { transformBox: "fill-box", transformOrigin: "9px 15px" }, children: [_jsx("path", { d: "M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" }), _jsx("path", { d: "M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" }), _jsx("path", { ref: dotRef, d: "M7 9h.01", style: { transformOrigin: "center" } })] }), _jsx("path", { d: "M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" }), _jsx("path", { d: "M2 21v-4" })] }) }));
}
//# sourceMappingURL=CctvIcon.js.map
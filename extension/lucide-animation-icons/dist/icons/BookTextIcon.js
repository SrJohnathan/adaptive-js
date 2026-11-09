import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BookTextIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const line1Ref = ref(null);
    const line2Ref = ref(null);
    const getTargets = () => collectElements(svgRef.current, line1Ref.current, line2Ref.current);
    const startAnimation = () => {
        if (!svgRef.current || !line1Ref.current || !line2Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(svgRef.current, [
                { transform: "scale(1) rotate(0deg) translateY(0)" },
                { transform: "scale(1.04) rotate(-8deg) translateY(-2px)" },
                { transform: "scale(1.04) rotate(8deg) translateY(-2px)" },
                { transform: "scale(1.04) rotate(-8deg) translateY(-2px)" },
                { transform: "scale(1) rotate(0deg) translateY(0)" }
            ], 600, 0, "ease-in-out"),
            () => createIconAnimation(line1Ref.current, [
                { strokeDashoffset: "0", opacity: 1 },
                { strokeDashoffset: "8", opacity: 0.5 },
                { strokeDashoffset: "0", opacity: 1 }
            ], 600, 100, "ease"),
            () => createIconAnimation(line2Ref.current, [
                { strokeDashoffset: "0", opacity: 1 },
                { strokeDashoffset: "8", opacity: 0.5 },
                { strokeDashoffset: "0", opacity: 1 }
            ], 600, 200, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "book-text", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }), _jsx("path", { ref: line1Ref, d: "M8 11h8", style: { strokeDasharray: "8", strokeDashoffset: "0", transformOrigin: "center" } }), _jsx("path", { ref: line2Ref, d: "M8 7h6", style: { strokeDasharray: "8", strokeDashoffset: "0", transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=BookTextIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function MessageSquareXIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const groupRef = ref(null);
    const diag1Ref = ref(null);
    const diag2Ref = ref(null);
    const getTargets = () => collectElements(groupRef.current, diag1Ref.current, diag2Ref.current);
    const startAnimation = () => {
        if (!groupRef.current || !diag1Ref.current || !diag2Ref.current) {
            return;
        }
        const pathLength = 7.1;
        controller.current?.start([
            () => createIconAnimation(groupRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(8deg)" },
                { transform: "rotate(-8deg)" },
                { transform: "rotate(2deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(diag1Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 0, "ease-out"),
            () => createIconAnimation(diag2Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 150, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "message-square-x", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: _jsxs("g", { ref: groupRef, style: { transformOrigin: "bottom left" }, children: [_jsx("path", { d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" }), _jsx("path", { ref: diag1Ref, d: "m14.5 8.5-5 5", style: { strokeDasharray: "7.1", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } }), _jsx("path", { ref: diag2Ref, d: "m9.5 8.5 5 5", style: { strokeDasharray: "7.1", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } })] }) }) }));
}
//# sourceMappingURL=MessageSquareXIcon.js.map
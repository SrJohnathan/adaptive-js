import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function MessageCircleWarningIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const groupRef = ref(null);
    const path2Ref = ref(null);
    const getTargets = () => collectElements(groupRef.current, path2Ref.current);
    const startAnimation = () => {
        if (!groupRef.current || !path2Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(groupRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(8deg)" },
                { transform: "rotate(-8deg)" },
                { transform: "rotate(2deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(path2Ref.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(1px)" },
                { transform: "translateY(-0.25px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "message-circle-warning", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: _jsxs("g", { ref: groupRef, style: { transformOrigin: "bottom left" }, children: [_jsx("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }), _jsx("path", { ref: path2Ref, d: "M12 8v4", style: { transformOrigin: "center", transform: "translateY(0)" } }), _jsx("path", { d: "M12 16h.01" })] }) }) }));
}
//# sourceMappingURL=MessageCircleWarningIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function MessageSquareHeartIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
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
                { transform: "scale(1)" },
                { transform: "scale(0.7)" },
                { transform: "scale(1.1)" },
                { transform: "scale(1)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "message-square-heart", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: _jsxs("g", { ref: groupRef, style: { transformOrigin: "bottom left" }, children: [_jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }), _jsx("path", { ref: path2Ref, d: "M14.8 7.5a1.84 1.84 0 0 0-2.6 0l-.2.3-.3-.3a1.84 1.84 0 1 0-2.4 2.8L12 13l2.7-2.7c.9-.9.8-2.1.1-2.8", style: { transformOrigin: "center" } })] }) }) }));
}
//# sourceMappingURL=MessageSquareHeartIcon.js.map
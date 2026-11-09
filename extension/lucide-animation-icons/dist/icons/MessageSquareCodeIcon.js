import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function MessageSquareCodeIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const groupRef = ref(null);
    const path2Ref = ref(null);
    const path3Ref = ref(null);
    const getTargets = () => collectElements(groupRef.current, path2Ref.current, path3Ref.current);
    const startAnimation = () => {
        if (!groupRef.current || !path2Ref.current || !path3Ref.current) {
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
                { transform: "translateX(0)" },
                { transform: "translateX(-1.5px)" },
                { transform: "translateX(0.75px)" },
                { transform: "translateX(0)" }
            ], 600, 0, "ease-in-out"),
            () => createIconAnimation(path3Ref.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(1.5px)" },
                { transform: "translateX(-0.75px)" },
                { transform: "translateX(0)" }
            ], 600, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "message-square-code", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: _jsxs("g", { ref: groupRef, style: { transformOrigin: "bottom left" }, children: [_jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }), _jsx("path", { ref: path2Ref, d: "M10 7.5 8 10l2 2.5", style: { transformOrigin: "center" } }), _jsx("path", { ref: path3Ref, d: "m14 7.5 2 2.5-2 2.5", style: { transformOrigin: "center" } })] }) }) }));
}
//# sourceMappingURL=MessageSquareCodeIcon.js.map
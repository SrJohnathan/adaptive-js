import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function MessageCircleMoreIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const groupRef = ref(null);
    const line1Ref = ref(null);
    const line2Ref = ref(null);
    const line3Ref = ref(null);
    const getTargets = () => collectElements(groupRef.current, line1Ref.current, line2Ref.current, line3Ref.current);
    const startAnimation = () => {
        if (!groupRef.current || !line1Ref.current || !line2Ref.current || !line3Ref.current) {
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
            () => createIconAnimation(line1Ref.current, [
                { y1: 12, y2: 12 },
                { y1: 10.5, y2: 13.5 },
                { y1: 12, y2: 12 }
            ], 600, 200, "ease-in-out"),
            () => createIconAnimation(line2Ref.current, [
                { y1: 12, y2: 12 },
                { y1: 10.5, y2: 13.5 },
                { y1: 12, y2: 12 }
            ], 600, 100, "ease-in-out"),
            () => createIconAnimation(line3Ref.current, [
                { y1: 12, y2: 12 },
                { y1: 10.5, y2: 13.5 },
                { y1: 12, y2: 12 }
            ], 600, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "message-circle-more", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: _jsxs("g", { ref: groupRef, style: { transformOrigin: "bottom left" }, children: [_jsx("path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z" }), _jsx("line", { ref: line1Ref, x1: "16", y1: 12, x2: "16", y2: 12, style: { transformOrigin: "center" } }), _jsx("line", { ref: line2Ref, x1: "12", y1: 12, x2: "12", y2: 12, style: { transformOrigin: "center" } }), _jsx("line", { ref: line3Ref, x1: "8", y1: 12, x2: "8", y2: 12, style: { transformOrigin: "center" } })] }) }) }));
}
//# sourceMappingURL=MessageCircleMoreIcon.js.map
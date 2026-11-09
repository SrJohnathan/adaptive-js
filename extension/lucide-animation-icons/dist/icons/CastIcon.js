import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CastIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const line1Ref = ref(null);
    const line2Ref = ref(null);
    const line3Ref = ref(null);
    const getTargets = () => collectElements(line1Ref.current, line2Ref.current, line3Ref.current);
    const startAnimation = () => {
        if (!line1Ref.current || !line2Ref.current || !line3Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(line1Ref.current, [
                { opacity: 1 },
                { opacity: 0 }
            ], duration, 250, "ease"),
            () => createIconAnimation(line2Ref.current, [
                { opacity: 1 },
                { opacity: 0 }
            ], duration, 350, "ease"),
            () => createIconAnimation(line3Ref.current, [
                { opacity: 1 },
                { opacity: 0 }
            ], duration, 450, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "cast", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" }), _jsx("path", { ref: line3Ref, d: "M2 12a9 9 0 0 1 8 8", style: { opacity: 1, transformOrigin: "center" } }), _jsx("path", { ref: line2Ref, d: "M2 16a5 5 0 0 1 4 4", style: { opacity: 1, transformOrigin: "center" } }), _jsx("line", { ref: line1Ref, x1: "2", x2: "2.01", y1: "20", y2: "20", style: { opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=CastIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function WifiLowIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const line1Ref = ref(null);
    const dotRef = ref(null);
    const getTargets = () => collectElements(line1Ref.current, dotRef.current);
    const startAnimation = () => {
        if (!line1Ref.current || !dotRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(line1Ref.current, [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ], duration, 0, "ease-out"),
            () => createIconAnimation(dotRef.current, [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ], duration, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "wifi-low", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: dotRef, d: "M12 20h.01", style: { transformOrigin: "center", opacity: 1 } }), _jsx("path", { ref: line1Ref, d: "M8.5 16.429a5 5 0 0 1 7 0", style: { transformOrigin: "center", opacity: 1 } })] }) }));
}
//# sourceMappingURL=WifiLowIcon.js.map
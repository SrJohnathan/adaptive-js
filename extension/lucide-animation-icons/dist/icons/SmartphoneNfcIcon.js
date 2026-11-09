import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function SmartphoneNfcIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 700, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const getTargets = () => collectElements(svgRef.current);
    const startAnimation = () => {
        if (!svgRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(svgRef.current, [
                { opacity: "0" },
                { opacity: "1" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "smartphone-nfc", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("rect", { width: "7", height: "12", x: "2", y: "6", rx: "1" }), _jsx("path", { d: "M13 8.32a7.43 7.43 0 0 1 0 7.36", class: "nfc-level nfc-line-1" }), _jsx("path", { d: "M16.46 6.21a11.76 11.76 0 0 1 0 11.58", class: "nfc-level nfc-line-2" }), _jsx("path", { d: "M19.91 4.1a15.91 15.91 0 0 1 .01 15.8", class: "nfc-level nfc-line-3" })] }) }));
}
//# sourceMappingURL=SmartphoneNfcIcon.js.map
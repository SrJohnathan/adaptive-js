import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CloudDownloadIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const gRef = ref(null);
    const getTargets = () => collectElements(gRef.current);
    const startAnimation = () => {
        if (!gRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(gRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(2px)" },
                { transform: "translateY(0)" }
            ], 300, 0, "cubic-bezier(0.68, -0.6, 0.32, 1.6)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "cloud-download", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsxs("g", { ref: gRef, children: [_jsx("path", { d: "M12 13v8l-4-4" }), _jsx("path", { d: "m12 21 4-4" })] }), _jsx("path", { d: "M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284" })] }) }));
}
//# sourceMappingURL=CloudDownloadIcon.js.map
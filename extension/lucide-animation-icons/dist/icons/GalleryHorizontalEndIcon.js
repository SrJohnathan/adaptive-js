import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function GalleryHorizontalEndIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const path1Ref = ref(null);
    const path2Ref = ref(null);
    const getTargets = () => collectElements(path1Ref.current, path2Ref.current);
    const startAnimation = () => {
        if (!path1Ref.current || !path2Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(path1Ref.current, [
                { opacity: 0, transform: "translateX(3px)" },
                { opacity: 0, transform: "translateX(3px)" },
                { opacity: 1, transform: "translateX(0)" },
                { opacity: 1, transform: "translateX(0)" }
            ], duration, 0, "ease"),
            () => createIconAnimation(path2Ref.current, [
                { opacity: 0, transform: "translateX(3px)" },
                { opacity: 0, transform: "translateX(3px)" },
                { opacity: 1, transform: "translateX(0)" },
                { opacity: 1, transform: "translateX(0)" }
            ], duration, 150, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "gallery-horizontal-end", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { ref: path1Ref, d: "M2 7v10", style: { transformOrigin: "center", opacity: 1, transform: "translateX(0)" } }), _jsx("path", { ref: path2Ref, d: "M6 5v14", style: { transformOrigin: "center", opacity: 1, transform: "translateX(0)" } }), _jsx("rect", { width: "12", height: "18", x: "10", y: "3", rx: "2" })] }) }));
}
//# sourceMappingURL=GalleryHorizontalEndIcon.js.map
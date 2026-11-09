import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function LayoutDashboardIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 350, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const topLeftRef = ref(null);
    const topRightRef = ref(null);
    const bottomRightRef = ref(null);
    const bottomLeftRef = ref(null);
    const getTargets = () => collectElements(topLeftRef.current, topRightRef.current, bottomRightRef.current, bottomLeftRef.current);
    const startAnimation = () => {
        if (!topLeftRef.current || !topRightRef.current || !bottomRightRef.current || !bottomLeftRef.current)
            return;
        controller.current?.start([
            () => createIconAnimation(topLeftRef.current, [
                { opacity: 0, transform: "translateX(-10px)" },
                { opacity: 0.8, transform: "translateX(2px)" },
                { opacity: 1, transform: "translateX(0)" }
            ], duration, 0, "ease-out"),
            () => createIconAnimation(bottomRightRef.current, [
                { opacity: 0, transform: "translateX(10px)" },
                { opacity: 0.8, transform: "translateX(-2px)" },
                { opacity: 1, transform: "translateX(0)" }
            ], duration, 100, "ease-out"),
            () => createIconAnimation(topRightRef.current, [
                { opacity: 0, transform: "translateY(-10px)" },
                { opacity: 0.8, transform: "translateY(2px)" },
                { opacity: 1, transform: "translateY(0)" }
            ], duration, 200, "ease-out"),
            () => createIconAnimation(bottomLeftRef.current, [
                { opacity: 0, transform: "translateY(10px)" },
                { opacity: 0.8, transform: "translateY(-2px)" },
                { opacity: 1, transform: "translateY(0)" }
            ], duration, 300, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "layout-dashboard", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: topLeftRef, width: "7", height: "9", x: "3", y: "3", rx: "1", style: { transformOrigin: "center" } }), _jsx("rect", { ref: topRightRef, width: "7", height: "5", x: "14", y: "3", rx: "1", style: { transformOrigin: "center" } }), _jsx("rect", { ref: bottomRightRef, width: "7", height: "9", x: "14", y: "12", rx: "1", style: { transformOrigin: "center" } }), _jsx("rect", { ref: bottomLeftRef, width: "7", height: "5", x: "3", y: "16", rx: "1", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=LayoutDashboardIcon.js.map
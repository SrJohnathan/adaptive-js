import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function WifiZeroIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const levelRef = ref(null);
    const getTargets = () => collectElements(levelRef.current);
    const startAnimation = () => {
        if (!levelRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(levelRef.current, [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 },
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ], duration, 0, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "wifi-zero", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: _jsx("path", { ref: levelRef, d: "M12 20h.01", style: { transformOrigin: "center", opacity: 1 } }) }) }));
}
//# sourceMappingURL=WifiZeroIcon.js.map
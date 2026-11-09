import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function WashingMachineIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 3000, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const drumRef = ref(null);
    const getTargets = () => collectElements(drumRef.current);
    const startAnimation = () => {
        if (!drumRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(drumRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-1080deg)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "washing-machine", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "M3 6h3" }), _jsx("path", { d: "M17 6h.01" }), _jsx("rect", { width: "18", height: "20", x: "3", y: "2", rx: "2" }), _jsxs("g", { ref: drumRef, style: { transformBox: "fill-box", transformOrigin: "center 13px" }, children: [_jsx("circle", { cx: "12", cy: "13", r: "5" }), _jsx("path", { d: "M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" })] })] }) }));
}
//# sourceMappingURL=WashingMachineIcon.js.map
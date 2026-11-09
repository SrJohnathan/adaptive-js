import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CircleArrowLeftIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const pathRef = ref(null);
    const path2Ref = ref(null);
    const getTargets = () => collectElements(pathRef.current, path2Ref.current);
    const startAnimation = () => {
        if (!pathRef.current || !path2Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(pathRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(1.5px)" },
                { transform: "translateX(0)" }
            ], 200, 0, "ease-out"),
            () => createIconAnimation(path2Ref.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(1.5px)" },
                { transform: "translateX(0)" }
            ], 200, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "circle-arrow-left", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { d: "M16 12H12" }), _jsx("path", { ref: pathRef, d: "M12 12H8", style: { transformOrigin: "center" } }), _jsx("path", { ref: path2Ref, d: "m12 8-4 4 4 4", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=CircleArrowLeftIcon.js.map
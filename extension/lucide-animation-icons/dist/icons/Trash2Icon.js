import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function Trash2Icon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const lidRef = ref(null);
    const bodyRef = ref(null);
    const getTargets = () => collectElements(lidRef.current, bodyRef.current);
    const startAnimation = () => {
        if (!lidRef.current || !bodyRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(lidRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ], 500, 0, "ease-in-out"),
            () => createIconAnimation(bodyRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(2px)" },
                { transform: "translateY(0)" }
            ], 500, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "trash-2", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: lidRef, d: "M10 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7h2", style: { transformOrigin: "center" } }), _jsx("path", { ref: bodyRef, d: "M8 11h8", style: { transformOrigin: "center" } }), _jsx("path", { d: "M6 4h.01" }), _jsx("path", { d: "M18 4h.01" }), _jsx("path", { d: "M10 7v12" }), _jsx("path", { d: "M14 7v12" })] }) }));
}
//# sourceMappingURL=Trash2Icon.js.map
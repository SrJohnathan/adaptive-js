import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function PencilLineIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const penRef = ref(null);
    const lineRef = ref(null);
    const getTargets = () => collectElements(penRef.current, lineRef.current);
    const startAnimation = () => {
        if (!penRef.current || !lineRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(penRef.current, [
                { transform: "rotate(0deg) translate(0px, 0px)" },
                { transform: "rotate(-0.5deg) translate(-1px, 1.5px)" },
                { transform: "rotate(0.5deg) translate(1.5px, -1px)" },
                { transform: "rotate(0deg) translate(0px, 0px)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(lineRef.current, [
                { transform: "rotate(0deg) translate(0px, 0px)" },
                { transform: "rotate(-0.5deg) translate(-1px, 1.5px)" },
                { transform: "rotate(0.5deg) translate(1.5px, -1px)" },
                { transform: "rotate(0deg) translate(0px, 0px)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "pencil-line", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "M12 20h9" }), _jsx("path", { ref: penRef, d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z", style: { transformOrigin: "16.376px 3.622px" } }), _jsx("path", { ref: lineRef, d: "m15 5 3 3", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=PencilLineIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CloudMoonIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1400, animateOnHover = true, iconRef, ...props }) {
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
                { transform: "translate(0, 0)" },
                { transform: "translate(-1px, -1px)" },
                { transform: "translate(1px, 1px)" },
                { transform: "translate(0, 0)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(path2Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(6deg)" },
                { transform: "rotate(-8deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "cloud-moon", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: path1Ref, d: "M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z", style: { transformOrigin: "center" } }), _jsx("path", { ref: path2Ref, d: "M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=CloudMoonIcon.js.map
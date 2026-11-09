import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function UserCogIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const getTargets = () => collectElements(svgRef.current);
    const startAnimation = () => {
        if (!svgRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(svgRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(180deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "user-cog", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "18px 15px" }, children: [_jsxs("g", { class: "cog-group", children: [_jsx("circle", { cx: "18", cy: "15", r: "3" }), _jsx("path", { d: "m21.7 16.4-.9-.3" }), _jsx("path", { d: "m15.2 13.9-.9-.3" }), _jsx("path", { d: "m16.6 18.7.3-.9" }), _jsx("path", { d: "m19.1 12.2.3-.9" }), _jsx("path", { d: "m19.6 18.7-.4-1" }), _jsx("path", { d: "m16.8 12.3-.4-1" }), _jsx("path", { d: "m14.3 16.6 1-.4" }), _jsx("path", { d: "m20.7 13.8 1-.4" })] }), _jsx("circle", { cx: "9", cy: "7", r: "4" }), _jsx("path", { d: "M10 15H6a4 4 0 0 0-4 4v2" })] }) }));
}
//# sourceMappingURL=UserCogIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function FolderCogIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
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
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "folder-cog", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "18px 18px" }, children: [_jsx("path", { d: "M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.3" }), _jsxs("g", { class: "cog-group", children: [_jsx("circle", { cx: "18", cy: "18", r: "3" }), _jsx("path", { d: "m21.7 19.4-.9-.3" }), _jsx("path", { d: "m15.2 16.9-.9-.3" }), _jsx("path", { d: "m16.6 21.7.3-.9" }), _jsx("path", { d: "m19.1 15.2.3-.9" }), _jsx("path", { d: "m19.6 21.7-.4-1" }), _jsx("path", { d: "m16.8 15.3-.4-1" }), _jsx("path", { d: "m14.3 19.6 1-.4" }), _jsx("path", { d: "m20.7 16.8 1-.4" })] })] }) }));
}
//# sourceMappingURL=FolderCogIcon.js.map
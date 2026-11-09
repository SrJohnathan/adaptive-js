import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BrainCogIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const cogRef = ref(null);
    const getTargets = () => collectElements(cogRef.current);
    const startAnimation = () => {
        if (!cogRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(cogRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(180deg)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "brain-cog", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588 4 4 0 0 0 7.636 2.106 3.2 3.2 0 0 0 .164-.546c.028-.13.306-.13.335 0a3.2 3.2 0 0 0 .163.546 4 4 0 0 0 7.636-2.106 4 4 0 0 0 .556-6.588 4 4 0 0 0-2.526-5.77A3 3 0 1 0 12 5" }), _jsx("path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375" }), _jsx("path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5" }), _jsx("path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396" }), _jsx("path", { d: "M19.938 10.5a4 4 0 0 1 .585.396" }), _jsx("path", { d: "M6 18a4 4 0 0 1-1.967-.516" }), _jsx("path", { d: "M19.967 17.484A4 4 0 0 1 18 18" }), _jsxs("g", { ref: cogRef, style: { transformBox: "fill-box", transformOrigin: "center" }, children: [_jsx("circle", { cx: "12", cy: "12", r: "3" }), _jsx("path", { d: "m15.7 10.4-.9.4" }), _jsx("path", { d: "m9.2 13.2-.9.4" }), _jsx("path", { d: "m13.6 15.7-.4-.9" }), _jsx("path", { d: "m10.8 9.2-.4-.9" }), _jsx("path", { d: "m15.7 13.5-.9-.4" }), _jsx("path", { d: "m9.2 10.9-.9.4" }), _jsx("path", { d: "m10.5 15.7.4-.9" }), _jsx("path", { d: "m13.1 9.2.4-.9" })] })] }) }));
}
//# sourceMappingURL=BrainCogIcon.js.map
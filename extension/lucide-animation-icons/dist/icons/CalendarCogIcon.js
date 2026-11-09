import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CalendarCogIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
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
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "calendar-cog", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { d: "M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" }), _jsx("path", { d: "M16 2v4" }), _jsx("path", { d: "M3 10h18" }), _jsx("path", { d: "M8 2v4" }), _jsxs("g", { ref: cogRef, style: { transformBox: "fill-box", transformOrigin: "18px 18px" }, children: [_jsx("path", { d: "m15.2 16.9-.9-.4" }), _jsx("path", { d: "m15.2 19.1-.9.4" }), _jsx("path", { d: "m16.9 15.2-.4-.9" }), _jsx("path", { d: "m16.9 20.8-.4.9" }), _jsx("path", { d: "m19.5 14.3-.4.9" }), _jsx("path", { d: "m19.5 21.7-.4-.9" }), _jsx("path", { d: "m21.7 16.5-.9.4" }), _jsx("path", { d: "m21.7 19.5-.9-.4" }), _jsx("circle", { cx: "18", cy: "18", r: "3" })] })] }) }));
}
//# sourceMappingURL=CalendarCogIcon.js.map
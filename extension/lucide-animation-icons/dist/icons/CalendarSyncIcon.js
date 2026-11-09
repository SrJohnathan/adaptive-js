import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CalendarSyncIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 400, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const syncRef = ref(null);
    const getTargets = () => collectElements(syncRef.current);
    const startAnimation = () => {
        if (!syncRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(syncRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-50deg)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "calendar-sync", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsxs("g", { ref: syncRef, style: { transformBox: "fill-box", transformOrigin: "center" }, children: [_jsx("path", { d: "M11 10v4h4" }), _jsx("path", { d: "m11 14 1.535-1.605a5 5 0 0 1 8 1.5" }), _jsx("path", { d: "M21 22v-4h-4" }), _jsx("path", { d: "m21 18-1.535 1.605a5 5 0 0 1-8-1.5" })] }), _jsx("path", { d: "M16 2v4" }), _jsx("path", { d: "M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3" }), _jsx("path", { d: "M3 10h4" }), _jsx("path", { d: "M8 2v4" })] }) }));
}
//# sourceMappingURL=CalendarSyncIcon.js.map
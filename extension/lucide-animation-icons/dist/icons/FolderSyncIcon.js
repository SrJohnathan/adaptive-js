import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function FolderSyncIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 400, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const element0Ref = ref(null);
    const getTargets = () => collectElements(element0Ref.current);
    const startAnimation = () => {
        if (!element0Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(element0Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-50deg)" },
                { transform: "rotate(0deg)" }
            ], 400, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "folder-sync", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5" }), _jsxs("g", { class: "sync-arrows", children: [_jsx("path", { d: "M12 10v4h4" }), _jsx("path", { d: "m12 14 1.535-1.605a5 5 0 0 1 8 1.5" }), _jsx("path", { d: "M22 22v-4h-4" }), _jsx("path", { d: "m22 18-1.535 1.605a5 5 0 0 1-8-1.5" })] })] }) }));
}
//# sourceMappingURL=FolderSyncIcon.js.map
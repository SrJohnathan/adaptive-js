import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function FileStackIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const element0Ref = ref(null);
    const element1Ref = ref(null);
    const getTargets = () => collectElements(element0Ref.current, element1Ref.current);
    const startAnimation = () => {
        if (!element0Ref.current || !element1Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(element0Ref.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(-4px, 4px)" },
                { transform: "translate(0, 0)" }
            ], 300, 0, "ease"),
            () => createIconAnimation(element1Ref.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(4px, -4px)" },
                { transform: "translate(0, 0)" }
            ], 300, 0, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "file-stack", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M21 7h-3a2 2 0 0 1-2-2V2", class: "file-top" }), _jsx("path", { d: "M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z", class: "file-top" }), _jsx("path", { d: "M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" }), _jsx("path", { d: "M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11", class: "file-bottom" })] }) }));
}
//# sourceMappingURL=FileStackIcon.js.map
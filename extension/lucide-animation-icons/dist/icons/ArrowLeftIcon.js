import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ArrowLeftIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const head1Ref = ref(null);
    const head2Ref = ref(null);
    const getTargets = () => collectElements(head1Ref.current, head2Ref.current);
    const startAnimation = () => {
        if (!head1Ref.current || !head2Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(head1Ref.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(3px)" },
                { transform: "translateX(0)" }
            ], duration, 0, "ease-out"),
            () => createIconAnimation(head2Ref.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(3px)" },
                { transform: "translateX(0)" }
            ], duration, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "arrow-left", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: head1Ref, d: "m12 19-7-7 7-7", style: { transformOrigin: "center", transition: "all 0.2s ease-out" } }), _jsx("path", { ref: head2Ref, d: "M10 12H5", style: { transformOrigin: "center", transition: "all 0.2s ease-out" } }), _jsx("path", { d: "M19 12H10" })] }) }));
}
//# sourceMappingURL=ArrowLeftIcon.js.map
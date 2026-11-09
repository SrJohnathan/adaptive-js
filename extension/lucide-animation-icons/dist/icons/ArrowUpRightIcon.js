import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ArrowUpRightIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const headRef = ref(null);
    const head2Ref = ref(null);
    const getTargets = () => collectElements(headRef.current, head2Ref.current);
    const startAnimation = () => {
        if (!headRef.current || !head2Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(headRef.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(-3px, 3px)" },
                { transform: "translate(0, 0)" }
            ], 200, 0, "ease-out"),
            () => createIconAnimation(head2Ref.current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(-3px, 3px)" },
                { transform: "translate(0, 0)" }
            ], 200, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "arrow-up-right", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { ref: headRef, d: "M7 7h10v10", style: { transformOrigin: "center" } }), _jsx("path", { ref: head2Ref, d: "M17 7 L12 12", style: { transformOrigin: "center" } }), _jsx("path", { d: "M7 17 L12 12" })] }) }));
}
//# sourceMappingURL=ArrowUpRightIcon.js.map
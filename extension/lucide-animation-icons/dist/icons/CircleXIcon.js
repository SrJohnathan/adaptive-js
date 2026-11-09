import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function CircleXIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const diag1Ref = ref(null);
    const diag2Ref = ref(null);
    const getTargets = () => collectElements(diag1Ref.current, diag2Ref.current);
    const startAnimation = () => {
        if (!diag1Ref.current || !diag2Ref.current) {
            return;
        }
        const pathLength = 8.5;
        const setDash = (el) => {
            el.style.strokeDasharray = `${pathLength}`;
            el.style.strokeDashoffset = `${pathLength}`;
        };
        setDash(diag1Ref.current);
        setDash(diag2Ref.current);
        controller.current?.start([
            () => createIconAnimation(diag1Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 0, "ease-out"),
            () => createIconAnimation(diag2Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 100, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "circle-x", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { ref: diag1Ref, d: "m15 9-6 6", style: { strokeDasharray: "8.5", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } }), _jsx("path", { ref: diag2Ref, d: "m9 9 6 6", style: { strokeDasharray: "8.5", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=CircleXIcon.js.map
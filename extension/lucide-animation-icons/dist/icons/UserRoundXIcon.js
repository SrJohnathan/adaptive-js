import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function UserRoundXIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const pathRef = ref(null);
    const circleRef = ref(null);
    const diag1Ref = ref(null);
    const diag2Ref = ref(null);
    const getTargets = () => collectElements(pathRef.current, circleRef.current, diag1Ref.current, diag2Ref.current);
    const startAnimation = () => {
        if (!pathRef.current || !circleRef.current || !diag1Ref.current || !diag2Ref.current) {
            return;
        }
        const pathLength = 7.1;
        controller.current?.start([
            () => createIconAnimation(pathRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(4px)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ], 600, 0, "ease-in-out"),
            () => createIconAnimation(circleRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(1px)" },
                { transform: "translateY(-0.5px)" },
                { transform: "translateY(0)" }
            ], 600, 0, "ease-in-out"),
            () => createIconAnimation(diag1Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 0, "ease-out"),
            () => createIconAnimation(diag2Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 150, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "user-round-x", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: pathRef, d: "M2 21a8 8 0 0 1 11.873-7", style: { transformOrigin: "center" } }), _jsx("circle", { ref: circleRef, cx: "10", cy: "8", r: "5", style: { transformOrigin: "center" } }), _jsx("path", { ref: diag1Ref, d: "m22 17-5 5", style: { strokeDasharray: "7.1", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } }), _jsx("path", { ref: diag2Ref, d: "m17 17 5 5", style: { strokeDasharray: "7.1", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=UserRoundXIcon.js.map
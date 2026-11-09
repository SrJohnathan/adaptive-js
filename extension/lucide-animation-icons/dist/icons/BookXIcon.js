import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BookXIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const diagonal1Ref = ref(null);
    const diagonal2Ref = ref(null);
    const getTargets = () => collectElements(svgRef.current, diagonal1Ref.current, diagonal2Ref.current);
    const startAnimation = () => {
        if (!svgRef.current || !diagonal1Ref.current || !diagonal2Ref.current) {
            return;
        }
        const pathLength = 7.1;
        diagonal1Ref.current.style.strokeDasharray = `${pathLength}`;
        diagonal1Ref.current.style.strokeDashoffset = `${pathLength}`;
        diagonal2Ref.current.style.strokeDasharray = `${pathLength}`;
        diagonal2Ref.current.style.strokeDashoffset = `${pathLength}`;
        controller.current?.start([
            () => createIconAnimation(svgRef.current, [
                { transform: "scale(1) rotate(0deg) translateY(0)" },
                { transform: "scale(1.04) rotate(-8deg) translateY(-2px)" },
                { transform: "scale(1.04) rotate(8deg) translateY(-2px)" },
                { transform: "scale(1.04) rotate(-8deg) translateY(-2px)" },
                { transform: "scale(1) rotate(0deg) translateY(0)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(diagonal1Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 0, "ease-out"),
            () => createIconAnimation(diagonal2Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 250, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "book-x", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }), _jsx("path", { ref: diagonal1Ref, d: "m14.5 7-5 5" }), _jsx("path", { ref: diagonal2Ref, d: "m9.5 7 5 5" })] }) }));
}
//# sourceMappingURL=BookXIcon.js.map
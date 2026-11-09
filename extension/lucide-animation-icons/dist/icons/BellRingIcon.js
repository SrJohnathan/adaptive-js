import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BellRingIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1100, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const bell1Ref = ref(null);
    const bell2Ref = ref(null);
    const bell3Ref = ref(null);
    const clapperRef = ref(null);
    const getTargets = () => collectElements(bell1Ref.current, bell2Ref.current, bell3Ref.current, clapperRef.current);
    const startAnimation = () => {
        if (!bell1Ref.current || !bell2Ref.current || !bell3Ref.current || !clapperRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(bell1Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(20deg)" },
                { transform: "rotate(-10deg)" },
                { transform: "rotate(10deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(3deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(bell2Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(20deg)" },
                { transform: "rotate(-10deg)" },
                { transform: "rotate(10deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(3deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(bell3Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(20deg)" },
                { transform: "rotate(-10deg)" },
                { transform: "rotate(10deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(3deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(clapperRef.current, [
                { transform: "translateX(0)" },
                { transform: "translateX(-6px)" },
                { transform: "translateX(5px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(4px)" },
                { transform: "translateX(-3px)" },
                { transform: "translateX(2px)" },
                { transform: "translateX(0)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "bell-ring", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: bell1Ref, d: "M4 2C2.8 3.7 2 5.7 2 8", style: { transformOrigin: "top center" } }), _jsx("path", { ref: bell2Ref, d: "M22 8c0-2.3-.8-4.3-2-6", style: { transformOrigin: "top center" } }), _jsx("path", { ref: bell3Ref, d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326", style: { transformOrigin: "top center" } }), _jsx("path", { ref: clapperRef, d: "M10.268 21a2 2 0 0 0 3.464 0", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=BellRingIcon.js.map
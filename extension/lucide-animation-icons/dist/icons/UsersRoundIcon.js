import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function UsersRoundIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const path1Ref = ref(null);
    const path2Ref = ref(null);
    const circleRef = ref(null);
    const getTargets = () => collectElements(path1Ref.current, path2Ref.current, circleRef.current);
    const startAnimation = () => {
        if (!path1Ref.current || !path2Ref.current || !circleRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(path1Ref.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(4px)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ], duration, 100, "ease-in-out"),
            () => createIconAnimation(path2Ref.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(1px)" },
                { transform: "translateY(-0.5px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(circleRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(1px)" },
                { transform: "translateY(-0.5px)" },
                { transform: "translateY(0)" }
            ], duration, 100, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "users-round", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { ref: path1Ref, d: "M18 21a8 8 0 0 0-16 0", style: { transformOrigin: "center" } }), _jsx("path", { ref: path2Ref, d: "M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3", style: { transformOrigin: "center" } }), _jsx("circle", { ref: circleRef, cx: 10, cy: 8, r: 5, style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=UsersRoundIcon.js.map
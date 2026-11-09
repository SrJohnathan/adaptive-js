import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function UserCheckIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const pathRef = ref(null);
    const circleRef = ref(null);
    const checkRef = ref(null);
    const getTargets = () => collectElements(pathRef.current, circleRef.current, checkRef.current);
    const startAnimation = () => {
        if (!pathRef.current || !circleRef.current || !checkRef.current) {
            return;
        }
        const pathLength = checkRef.current?.getTotalLength() || 10;
        controller.current?.start([
            () => createIconAnimation(pathRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(2px)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ], 600, 0, "ease-in-out"),
            () => createIconAnimation(circleRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(4px)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ], 600, 0, "ease-in-out"),
            () => createIconAnimation(checkRef.current, [
                { strokeDashoffset: "0", opacity: 1 },
                { strokeDashoffset: `${pathLength}`, opacity: 1 },
                { strokeDashoffset: "0", opacity: 1 }
            ], duration, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "user-check", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: pathRef, d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", style: { transformOrigin: "center" } }), _jsx("circle", { ref: circleRef, cx: "9", cy: "7", r: "4", style: { transformOrigin: "center" } }), _jsx("polyline", { ref: checkRef, points: "16 11 18 13 22 9", style: { strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=UserCheckIcon.js.map
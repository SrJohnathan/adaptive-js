import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function UsersIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const path1Ref = ref(null);
    const path2Ref = ref(null);
    const path3Ref = ref(null);
    const circleRef = ref(null);
    const getTargets = () => collectElements(path1Ref.current, path2Ref.current, path3Ref.current, circleRef.current);
    const startAnimation = () => {
        if (!path1Ref.current || !path2Ref.current || !path3Ref.current || !circleRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(path1Ref.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(2px)" },
                { transform: "translateY(-1px)" },
                { transform: "translateY(0)" }
            ], duration, 100, "ease-in-out"),
            () => createIconAnimation(path2Ref.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(4px)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in-out"),
            () => createIconAnimation(path3Ref.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(2px)" },
                { transform: "translateY(-1px)" },
                { transform: "translateY(0)" }
            ], duration, 100, "ease-in-out"),
            () => createIconAnimation(circleRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(4px)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ], duration, 100, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "users", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: path1Ref, d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", style: { transformOrigin: "center" } }), _jsx("path", { ref: path2Ref, d: "M16 3.128a4 4 0 0 1 0 7.744", style: { transformOrigin: "center" } }), _jsx("path", { ref: path3Ref, d: "M22 21v-2a4 4 0 0 0-3-3.87", style: { transformOrigin: "center" } }), _jsx("circle", { ref: circleRef, cx: 9, cy: 7, r: 4, style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=UsersIcon.js.map
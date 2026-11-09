import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function RouteIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const circle1Ref = ref(null);
    const circle2Ref = ref(null);
    const lineRef = ref(null);
    const getTargets = () => collectElements(circle1Ref.current, circle2Ref.current, lineRef.current);
    const startAnimation = () => {
        if (!circle1Ref.current || !circle2Ref.current || !lineRef.current) {
            return;
        }
        const pathLength = 50;
        controller.current?.start([
            () => createIconAnimation(circle1Ref.current, [
                { opacity: 0 },
                { opacity: 0 },
                { opacity: 1 }
            ], 400, 0, "ease-out"),
            () => createIconAnimation(circle2Ref.current, [
                { opacity: 0 },
                { opacity: 0 },
                { opacity: 1 }
            ], 400, 0, "ease-out"),
            () => createIconAnimation(lineRef.current, [
                { strokeDashoffset: `${pathLength}`, opacity: 0 },
                { strokeDashoffset: `${pathLength}`, opacity: 0 },
                { strokeDashoffset: "0", opacity: 1 }
            ], 800, 0, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "route", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("circle", { ref: circle1Ref, cx: "6", cy: "19", r: "3", style: { transformOrigin: "center", opacity: 1 } }), _jsx("circle", { ref: circle2Ref, cx: "18", cy: "5", r: "3", style: { transformOrigin: "center", opacity: 1 } }), _jsx("path", { ref: lineRef, d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15", style: { strokeDasharray: "50", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=RouteIcon.js.map
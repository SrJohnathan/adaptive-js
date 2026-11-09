import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function LightbulbIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const path1Ref = ref(null);
    const path2Ref = ref(null);
    const path3Ref = ref(null);
    const getTargets = () => collectElements(path1Ref.current, path2Ref.current, path3Ref.current);
    const startAnimation = () => {
        if (!path1Ref.current || !path2Ref.current || !path3Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(path1Ref.current, [
                { transform: "rotate(0deg)", fillOpacity: 0 },
                { transform: "rotate(-20deg)", fillOpacity: 1 },
                { transform: "rotate(15deg)", fillOpacity: 0 },
                { transform: "rotate(-7deg)", fillOpacity: 1 },
                { transform: "rotate(0deg)", fillOpacity: 0 }
            ], 800, 0, "ease-in-out"),
            () => createIconAnimation(path2Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(0deg)" },
                { transform: "rotate(10deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(0deg)" }
            ], 800, 0, "ease-in-out"),
            () => createIconAnimation(path3Ref.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(0deg)" },
                { transform: "rotate(10deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(0deg)" }
            ], 800, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "lightbulb", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: path1Ref, d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5", style: { transformBox: "fill-box", transformOrigin: "bottom center", fillOpacity: 0 } }), _jsx("path", { ref: path2Ref, d: "M9 18h6", style: { transformBox: "fill-box", transformOrigin: "bottom center" } }), _jsx("path", { ref: path3Ref, d: "M10 22h4", style: { transformBox: "fill-box", transformOrigin: "bottom center" } })] }) }));
}
//# sourceMappingURL=LightbulbIcon.js.map
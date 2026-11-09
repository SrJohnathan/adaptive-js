import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function TextSearchIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const pathRef = ref(null);
    const getTargets = () => collectElements(pathRef.current);
    const startAnimation = () => {
        if (!pathRef.current) {
            return;
        }
        const pathLength = pathRef.current.getTotalLength();
        pathRef.current.style.strokeDasharray = `${pathLength}`;
        pathRef.current.style.strokeDashoffset = `${pathLength}`;
        controller.current?.start([
            () => createIconAnimation(pathRef.current, [
                { strokeDashoffset: `${pathLength}`, opacity: 0 },
                { strokeDashoffset: `${pathLength}`, opacity: 0 },
                { strokeDashoffset: "0", opacity: 1 }
            ], 800, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "text-search", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: pathRef, d: "M21 13.5V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14a2 2 0 0 1-2 2H3", style: { transformOrigin: "center" } }), _jsx("path", { d: "M10 7H7a2 2 0 0 0-2 2v11" }), _jsx("path", { ref: pathRef, d: "M21 21l-4.3-4.3", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=TextSearchIcon.js.map
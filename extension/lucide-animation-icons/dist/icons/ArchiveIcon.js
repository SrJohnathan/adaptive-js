import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ArchiveIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const rectRef = ref(null);
    const path1Ref = ref(null);
    const path2Ref = ref(null);
    const getTargets = () => collectElements(rectRef.current, path1Ref.current, path2Ref.current);
    const startAnimation = () => {
        if (!rectRef.current || !path1Ref.current || !path2Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(rectRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in"),
            () => createIconAnimation(path1Ref.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(2px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in"),
            () => createIconAnimation(path2Ref.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(2px)" },
                { transform: "translateY(0)" }
            ], duration, 0, "ease-in")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "archive", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: rectRef, width: "20", height: "5", x: "2", y: "3", rx: "1", style: { transformOrigin: "center" } }), _jsx("path", { ref: path1Ref, d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", style: { transformOrigin: "center" } }), _jsx("path", { ref: path2Ref, d: "M10 12h4", style: { transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=ArchiveIcon.js.map
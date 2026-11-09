import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function WifiPenIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const line3Ref = ref(null);
    const penRef = ref(null);
    const line2Ref = ref(null);
    const line1Ref = ref(null);
    const getTargets = () => collectElements(line3Ref.current, penRef.current, line2Ref.current, line1Ref.current);
    const startAnimation = () => {
        if (!line3Ref.current || !penRef.current || !line2Ref.current || !line1Ref.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(line3Ref.current, [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ], duration, 0, "ease-out"),
            () => createIconAnimation(penRef.current, [
                { transform: "rotate(0deg) translate(0px, 0px)" },
                { transform: "rotate(-0.5deg) translate(-1px, 1.5px)" },
                { transform: "rotate(0.5deg) translate(1.5px, -1px)" },
                { transform: "rotate(0deg) translate(0px, 0px)" }
            ], 500, 0, "ease-in-out"),
            () => createIconAnimation(line2Ref.current, [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ], duration, 0, "ease-out"),
            () => createIconAnimation(line1Ref.current, [
                { opacity: 1 },
                { opacity: 0 },
                { opacity: 1 }
            ], duration, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "wifi-pen", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: line3Ref, d: "M2 8.82a15 15 0 0 1 20 0", style: { transformOrigin: "center", opacity: 1 } }), _jsx("path", { ref: penRef, d: "M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z", style: { transformOrigin: "center" } }), _jsx("path", { ref: line2Ref, d: "M5 12.859a10 10 0 0 1 10.5-2.222", style: { transformOrigin: "center", opacity: 1 } }), _jsx("path", { ref: line1Ref, d: "M8.5 16.429a5 5 0 0 1 3-1.406", style: { transformOrigin: "center", opacity: 1 } })] }) }));
}
//# sourceMappingURL=WifiPenIcon.js.map
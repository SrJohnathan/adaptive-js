import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ClipboardPenLineIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const clipRef = ref(null);
    const boardRef = ref(null);
    const penRef = ref(null);
    const lineRef = ref(null);
    const getTargets = () => collectElements(clipRef.current, boardRef.current, penRef.current, lineRef.current);
    const startAnimation = () => {
        if (!clipRef.current || !boardRef.current || !penRef.current || !lineRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(clipRef.current, [
                { transform: "translateY(0)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(1px)" },
                { transform: "translateY(0)" }
            ], 500, 0, "ease-in-out"),
            () => createIconAnimation(boardRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-1deg)" },
                { transform: "rotate(1deg)" },
                { transform: "rotate(0deg)" }
            ], 500, 0, "ease-in-out"),
            () => createIconAnimation(penRef.current, [
                { transform: "rotate(0deg) translate(0px, 0px)" },
                { transform: "rotate(-0.3deg) translate(-0.5px, 1px)" },
                { transform: "rotate(0.2deg) translate(1px, -0.5px)" },
                { transform: "rotate(-0.4deg) translate(0px, 0px)" },
                { transform: "rotate(0deg) translate(0px, 0px)" }
            ], 500, 0, "ease-in-out"),
            () => createIconAnimation(lineRef.current, [
                { d: "M8 18h1" },
                { d: "M8 18h5" },
                { d: "M8 18h1" }
            ], 500, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "clipboard-pen-line", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: clipRef, width: "8", height: "4", x: "8", y: "2", rx: "1", style: { transformOrigin: "center" } }), _jsx("path", { ref: boardRef, d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5", style: { transformOrigin: "center" } }), _jsx("path", { d: "M16 4h2a2 2 0 0 1 1.73 1" }), _jsx("path", { ref: lineRef, d: "M8 18h1", style: { transformOrigin: "center" } }), _jsx("path", { ref: penRef, d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z", style: { transformOrigin: "19.876px 11.124px" } })] }) }));
}
//# sourceMappingURL=ClipboardPenLineIcon.js.map
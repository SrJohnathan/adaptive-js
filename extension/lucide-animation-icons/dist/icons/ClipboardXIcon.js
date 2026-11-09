import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ClipboardXIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const clipRef = ref(null);
    const boardRef = ref(null);
    const diag1Ref = ref(null);
    const diag2Ref = ref(null);
    const getTargets = () => collectElements(clipRef.current, boardRef.current, diag1Ref.current, diag2Ref.current);
    const startAnimation = () => {
        if (!clipRef.current || !boardRef.current || !diag1Ref.current || !diag2Ref.current) {
            return;
        }
        const pathLength = 8.5;
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
            () => createIconAnimation(diag1Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 0, "ease-out"),
            () => createIconAnimation(diag2Ref.current, [
                { opacity: 0, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: `${pathLength}` },
                { opacity: 1, strokeDashoffset: "0" }
            ], 300, 150, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "clipboard-x", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: clipRef, width: "8", height: "4", x: "8", y: "2", rx: "1", style: { transformOrigin: "center" } }), _jsx("path", { ref: boardRef, d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", style: { transformOrigin: "center" } }), _jsx("path", { ref: diag1Ref, d: "m15 11-6 6", style: { strokeDasharray: "8.5", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } }), _jsx("path", { ref: diag2Ref, d: "m9 11 6 6", style: { strokeDasharray: "8.5", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=ClipboardXIcon.js.map
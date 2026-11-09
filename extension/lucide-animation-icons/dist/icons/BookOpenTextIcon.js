import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function BookOpenTextIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const bookPathRef = ref(null);
    const centerLineRef = ref(null);
    const leftTopRef = ref(null);
    const leftBottomRef = ref(null);
    const rightTopRef = ref(null);
    const rightBottomRef = ref(null);
    const getTargets = () => collectElements(svgRef.current, bookPathRef.current, centerLineRef.current, leftTopRef.current, leftBottomRef.current, rightTopRef.current, rightBottomRef.current);
    const startAnimation = () => {
        if (!svgRef.current || !bookPathRef.current || !centerLineRef.current) {
            return;
        }
        controller.current?.start([
            // bookOpen - whole SVG scale
            () => createIconAnimation(svgRef.current, [
                { transform: "scale(1)" },
                { transform: "scale(1.05)" },
                { transform: "scale(1)" }
            ], 800, 0, "ease"),
            // bookPages - book path scaleY
            () => createIconAnimation(bookPathRef.current, [
                { transform: "scaleY(1)" },
                { transform: "scaleY(1.1)" },
                { transform: "scaleY(1)" }
            ], 800, 0, "ease"),
            // bookPages - center line scaleY
            () => createIconAnimation(centerLineRef.current, [
                { transform: "scaleY(1)" },
                { transform: "scaleY(1.1)" },
                { transform: "scaleY(1)" }
            ], 800, 0, "ease"),
            // drawLine - left top
            () => createIconAnimation(leftTopRef.current, [
                { strokeDashoffset: "3" },
                { strokeDashoffset: "0" }
            ], 400, 200, "ease"),
            // drawLine - left bottom
            () => createIconAnimation(leftBottomRef.current, [
                { strokeDashoffset: "3" },
                { strokeDashoffset: "0" }
            ], 400, 400, "ease"),
            // drawLine - right top
            () => createIconAnimation(rightTopRef.current, [
                { strokeDashoffset: "3" },
                { strokeDashoffset: "0" }
            ], 400, 600, "ease"),
            // drawLine - right bottom
            () => createIconAnimation(rightBottomRef.current, [
                { strokeDashoffset: "3" },
                { strokeDashoffset: "0" }
            ], 400, 800, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "book-open-text", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { ref: svgRef, xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", style: { transformOrigin: "center" }, children: [_jsx("path", { ref: centerLineRef, d: "M12 7v14", style: { transformOrigin: "center bottom" } }), _jsx("path", { ref: rightBottomRef, d: "M16 12h2", style: { strokeDasharray: "3", strokeDashoffset: "0", transformOrigin: "center bottom" } }), _jsx("path", { ref: rightTopRef, d: "M16 8h2", style: { strokeDasharray: "3", strokeDashoffset: "0", transformOrigin: "center bottom" } }), _jsx("path", { ref: bookPathRef, d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z", style: { transformOrigin: "center bottom" } }), _jsx("path", { ref: leftBottomRef, d: "M6 12h2", style: { strokeDasharray: "3", strokeDashoffset: "0", transformOrigin: "center bottom" } }), _jsx("path", { ref: leftTopRef, d: "M6 8h2", style: { strokeDasharray: "3", strokeDashoffset: "0", transformOrigin: "center bottom" } })] }) }));
}
//# sourceMappingURL=BookOpenTextIcon.js.map
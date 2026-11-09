import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ClipboardListIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 500, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const clipRef = ref(null);
    const boardRef = ref(null);
    const item1Ref = ref(null);
    const item2Ref = ref(null);
    const bullet1Ref = ref(null);
    const bullet2Ref = ref(null);
    const getTargets = () => collectElements(clipRef.current, boardRef.current, item1Ref.current, item2Ref.current, bullet1Ref.current, bullet2Ref.current);
    const startAnimation = () => {
        if (!clipRef.current || !boardRef.current || !item1Ref.current || !item2Ref.current || !bullet1Ref.current || !bullet2Ref.current) {
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
            () => createIconAnimation(item1Ref.current, [
                { opacity: 0, transform: "translateX(-8px)" },
                { opacity: 1, transform: "translateX(0)" }
            ], 200, 150, "ease"),
            () => createIconAnimation(bullet1Ref.current, [
                { opacity: 0, transform: "translateX(-6px) scale(0.8)" },
                { opacity: 1, transform: "translateX(0) scale(1)" }
            ], 200, 200, "ease"),
            () => createIconAnimation(item2Ref.current, [
                { opacity: 0, transform: "translateX(-8px)" },
                { opacity: 1, transform: "translateX(0)" }
            ], 200, 300, "ease"),
            () => createIconAnimation(bullet2Ref.current, [
                { opacity: 0, transform: "translateX(-6px) scale(0.8)" },
                { opacity: 1, transform: "translateX(0) scale(1)" }
            ], 200, 350, "ease")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "clipboard-list", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("rect", { ref: clipRef, width: "8", height: "4", x: "8", y: "2", rx: "1", style: { transformOrigin: "center" } }), _jsx("path", { ref: boardRef, d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2", style: { transformOrigin: "center" } }), _jsx("path", { ref: item1Ref, d: "M12 11h4", style: { transformOrigin: "center" } }), _jsx("path", { ref: item2Ref, d: "M12 16h4", style: { transformOrigin: "center" } }), _jsx("path", { ref: bullet1Ref, d: "M8 11h.01", style: { opacity: 1, transformOrigin: "center" } }), _jsx("path", { ref: bullet2Ref, d: "M8 16h.01", style: { opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=ClipboardListIcon.js.map
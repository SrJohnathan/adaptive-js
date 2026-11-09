import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ShipIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const waveRef = ref(null);
    const bodyRef = ref(null);
    const getTargets = () => collectElements(waveRef.current, bodyRef.current);
    const startAnimation = () => {
        if (!waveRef.current || !bodyRef.current) {
            return;
        }
        const pathLength = 30;
        controller.current?.start([
            () => createIconAnimation(waveRef.current, [
                { strokeDashoffset: "30", opacity: 0 },
                { strokeDashoffset: "30", opacity: 0 },
                { strokeDashoffset: "0", opacity: 1 }
            ], 600, 0, "ease-in-out"),
            () => createIconAnimation(bodyRef.current, [
                { transform: "rotate(-3deg)" },
                { transform: "rotate(3deg)" },
                { transform: "rotate(-3deg)" }
            ], 2400, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "ship", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [_jsx("path", { ref: waveRef, d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1", style: { strokeDasharray: "30", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } }), _jsxs("g", { ref: bodyRef, style: { transformBox: "fill-box", transformOrigin: "center" }, children: [_jsx("path", { d: "M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" }), _jsx("path", { d: "M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" }), _jsx("path", { d: "M12 10v4" }), _jsx("path", { d: "M12 2v3" })] })] }) }));
}
//# sourceMappingURL=ShipIcon.js.map
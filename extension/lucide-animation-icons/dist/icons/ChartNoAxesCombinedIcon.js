import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ChartNoAxesCombinedIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 1000, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const lineRef = ref(null);
    const columns = Array.from({ length: 5 }, () => ref(null));
    const getTargets = () => collectElements(lineRef.current, ...columns.map(r => r.current));
    const startAnimation = () => {
        if (!lineRef.current || !columns[0].current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(lineRef.current, [
                { strokeDashoffset: "28", opacity: 0 },
                { strokeDashoffset: "28", opacity: 0 },
                { strokeDashoffset: "0", opacity: 1 }
            ], 900, 100, "ease"),
            ...columns.map((r, i) => () => createIconAnimation(r.current, [
                { strokeDashoffset: "0", opacity: 1 },
                { strokeDashoffset: "20", opacity: 0 },
                { strokeDashoffset: "0", opacity: 1 }
            ], 500, i * 100, "ease"))
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "chart-no-axes-combined", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", overflow: "visible", children: [[
                    { d: "M4 18v3", ref: columns[0] },
                    { d: "M8 14v7", ref: columns[1] },
                    { d: "M12 16v5", ref: columns[2] },
                    { d: "M16 14v7", ref: columns[3] },
                    { d: "M20 10v11", ref: columns[4] }
                ].map((item, i) => (_jsx("path", { ref: item.ref, d: item.d, style: { strokeDasharray: "20", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } }, i))), _jsx("path", { ref: lineRef, d: "M2 15l6.647-6.646a.5.5 0 0 1 .707 0L12.646 11.646a.5.5 0 0 0 .707 0L22 3", style: { strokeDasharray: "28", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=ChartNoAxesCombinedIcon.js.map
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function RainbowIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 800, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const arc1Ref = ref(null);
    const arc2Ref = ref(null);
    const arc3Ref = ref(null);
    const getTargets = () => collectElements(arc1Ref.current, arc2Ref.current, arc3Ref.current);
    const startAnimation = () => {
        if (!arc1Ref.current || !arc2Ref.current || !arc3Ref.current) {
            return;
        }
        const path1Length = arc1Ref.current.getTotalLength();
        const path2Length = arc2Ref.current.getTotalLength();
        const path3Length = arc3Ref.current.getTotalLength();
        arc1Ref.current.style.strokeDasharray = `${path1Length}`;
        arc1Ref.current.style.strokeDashoffset = `${path1Length * 2}`;
        arc2Ref.current.style.strokeDasharray = `${path2Length}`;
        arc2Ref.current.style.strokeDashoffset = `${path2Length * 2}`;
        arc3Ref.current.style.strokeDasharray = `${path3Length}`;
        arc3Ref.current.style.strokeDashoffset = `${path3Length * 2}`;
        controller.current?.start([
            () => createIconAnimation(arc1Ref.current, [
                { strokeDashoffset: `${path1Length * 2}` },
                { strokeDashoffset: `${path1Length * 2}` },
                { strokeDashoffset: `${path1Length}` }
            ], 800, 0, "ease-out"),
            () => createIconAnimation(arc2Ref.current, [
                { strokeDashoffset: `${path2Length * 2}` },
                { strokeDashoffset: `${path2Length * 2}` },
                { strokeDashoffset: `${path2Length}` }
            ], 800, 0, "ease-out"),
            () => createIconAnimation(arc3Ref.current, [
                { strokeDashoffset: `${path3Length * 2}` },
                { strokeDashoffset: `${path3Length * 2}` },
                { strokeDashoffset: `${path3Length}` }
            ], 800, 0, "ease-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "rainbow", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { ref: arc1Ref, d: "M22 17a10 10 0 0 0-20 0", style: { strokeDasharray: "64", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } }), _jsx("path", { ref: arc2Ref, d: "M18 17a6 6 0 0 0-12 0", style: { strokeDasharray: "38", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } }), _jsx("path", { ref: arc3Ref, d: "M14 17a2 2 0 0 0-4 0", style: { strokeDasharray: "14", strokeDashoffset: "0", opacity: 1, transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=RainbowIcon.js.map
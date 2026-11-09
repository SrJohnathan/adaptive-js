import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function ShrinkIcon({ color = "currentColor", size = 24, strokeWidth = 2, className, onMouseEnter, onMouseLeave, duration = 300, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const paths = Array.from({ length: 4 }, () => ref(null));
    const getTargets = () => collectElements(...paths.map(r => r.current));
    const startAnimation = () => {
        if (!paths[0].current)
            return;
        controller.current?.start([
            () => createIconAnimation(paths[0].current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(-1px, -1px)" },
                { transform: "translate(1px, 1px)" },
                { transform: "translate(0, 0)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)"),
            () => createIconAnimation(paths[1].current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(1px, -1px)" },
                { transform: "translate(-1px, 1px)" },
                { transform: "translate(0, 0)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)"),
            () => createIconAnimation(paths[2].current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(-1px, 1px)" },
                { transform: "translate(1px, -1px)" },
                { transform: "translate(0, 0)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)"),
            () => createIconAnimation(paths[3].current, [
                { transform: "translate(0, 0)" },
                { transform: "translate(1px, -1px)" },
                { transform: "translate(-1px, 1px)" },
                { transform: "translate(0, 0)" }
            ], duration, 0, "cubic-bezier(0.175, 0.885, 0.32, 1.275)")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), "aria-label": "shrink", role: "img", onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", children: [
                { d: "m15 15 6 6m-6-6v4.8m0-4.8h4.8", ref: paths[3] },
                { d: "M9 19.8V15m0 0H4.2M9 15l-6 6", ref: paths[2] },
                { d: "M15 4.2V9m0 0h4.8M15 9l6-6", ref: paths[1] },
                { d: "M9 4.2V9m0 0H4.2M9 9 3 3", ref: paths[0] }
            ].map((item, i) => (_jsx("path", { ref: paths[i], d: item.d, style: { transformOrigin: "center" } }, i))) }) }));
}
//# sourceMappingURL=ShrinkIcon.js.map
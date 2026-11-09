import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, createIconAnimation, useAnimatedIconHandle } from "../base.js";
export function MoonIcon({ onMouseEnter, onMouseLeave, className, size = 28, duration = 1200, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const svgRef = ref(null);
    const getTargets = () => (svgRef.current ? [svgRef.current] : []);
    const startAnimation = () => controller.current?.start([
        () => {
            if (!svgRef.current) {
                return null;
            }
            return createIconAnimation(svgRef.current, [
                { transform: "rotate(0deg)" },
                { transform: "rotate(-10deg)" },
                { transform: "rotate(10deg)" },
                { transform: "rotate(-5deg)" },
                { transform: "rotate(5deg)" },
                { transform: "rotate(0deg)" }
            ], duration, 0, "ease-in-out");
        }
    ]);
    const stopAnimation = () => {
        controller.current?.destroy(getTargets());
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    return (_jsx("div", { className: cn(className), onMouseEnter: (event) => {
            if (animateOnHover) {
                startAnimation();
            }
            onMouseEnter?.(event);
        }, onMouseLeave: (event) => {
            if (animateOnHover) {
                stopAnimation();
            }
            onMouseLeave?.(event);
        }, ...props, children: _jsx("svg", { ref: svgRef, fill: "none", height: size, stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", viewBox: "0 0 24 24", width: size, xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }) }) }));
}
//# sourceMappingURL=MoonIcon.js.map
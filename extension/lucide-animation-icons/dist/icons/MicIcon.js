import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import { ref } from "@adaptive-js/web";
import { AnimatedIconController, cn, collectElements, createIconAnimation, createMouseHandlers, useAnimatedIconHandle } from "../base.js";
export function MicIcon({ onMouseEnter, onMouseLeave, className, size = 28, duration = 600, animateOnHover = true, iconRef, ...props }) {
    const controller = ref(new AnimatedIconController());
    const capsuleRef = ref(null);
    const getTargets = () => collectElements(capsuleRef.current);
    const startAnimation = () => {
        if (!capsuleRef.current) {
            return;
        }
        controller.current?.start([
            () => createIconAnimation(capsuleRef.current, [
                { transform: "translateY(0px)" },
                { transform: "translateY(-3px)" },
                { transform: "translateY(0px)" },
                { transform: "translateY(-2px)" },
                { transform: "translateY(0px)" }
            ], duration, 0, "ease-in-out")
        ]);
    };
    const stopAnimation = () => {
        controller.current?.reset(getTargets(), Math.max(180, duration - 120));
    };
    useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation);
    const mouseHandlers = createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave);
    return (_jsx("div", { className: cn("adaptive-lucide-animation-icon", className), onMouseEnter: mouseHandlers.onMouseEnter, onMouseLeave: mouseHandlers.onMouseLeave, ...props, children: _jsxs("svg", { fill: "none", height: size, overflow: "visible", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", viewBox: "0 0 24 24", width: size, xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M12 19v3" }), _jsx("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }), _jsx("rect", { ref: capsuleRef, height: "13", rx: "3", width: "6", x: "9", y: "2", style: { transformBox: "fill-box", transformOrigin: "center" } })] }) }));
}
//# sourceMappingURL=MicIcon.js.map
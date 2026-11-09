import { layoutEvents } from "@adaptive-js/web";
export class AnimatedIconController {
    activeAnimations = [];
    stopRunningAnimations() {
        for (const animation of this.activeAnimations) {
            animation.cancel();
        }
        this.activeAnimations = [];
    }
    start(factories) {
        this.stopRunningAnimations();
        this.activeAnimations = factories.map((factory) => factory()).filter(Boolean);
    }
    reset(targets, duration) {
        this.stopRunningAnimations();
        this.activeAnimations = targets
            .map((target, index) => createNormalAnimation(target, duration, index * 18))
            .filter(Boolean);
    }
    destroy(targets) {
        this.stopRunningAnimations();
        finishAnimation(targets);
    }
}
export function cn(...values) {
    return values.filter(Boolean).join(" ");
}
export function assignHandle(target, handle) {
    if (!target) {
        return;
    }
    if (typeof target === "function") {
        target(handle);
        return;
    }
    target.current = handle;
}
export function collectElements(...elements) {
    return elements.filter(Boolean);
}
export function finishAnimation(elements) {
    for (const element of elements) {
        element.style.opacity = "1";
        element.style.transform = "none";
    }
}
export function createNormalAnimation(element, duration, delay = 0) {
    return element.animate([
        { opacity: Number(element.style.opacity || 1), transform: element.style.transform || "none" },
        { opacity: 1, transform: "none" }
    ], {
        duration,
        delay,
        easing: "ease-out",
        fill: "forwards"
    });
}
export function createIconAnimation(element, keyframes, duration, delay = 0, easing = "ease-in-out") {
    return element.animate(keyframes, {
        duration,
        delay,
        easing,
        fill: "forwards"
    });
}
export function createVariantAnimation(element, variants, stateName, fallbackDuration = 300) {
    if (!element) {
        return null;
    }
    const targetState = variants[stateName];
    if (!targetState) {
        return createNormalAnimation(element, fallbackDuration);
    }
    const normalState = variants.normal ?? {};
    const transition = resolveVariantTransition(targetState.transition);
    const keyframes = buildVariantKeyframes(element, normalState, targetState);
    return element.animate(keyframes, {
        duration: transition.duration ?? fallbackDuration,
        delay: transition.delay ?? 0,
        easing: transition.easing,
        fill: "forwards"
    });
}
export function useAnimatedIconHandle(iconRef, controller, getTargets, startAnimation, stopAnimation) {
    layoutEvents(() => {
        const handle = {
            startAnimation,
            stopAnimation
        };
        assignHandle(iconRef, handle);
        return () => {
            controller.current?.destroy(getTargets());
            assignHandle(iconRef, null);
        };
    }, [iconRef]);
}
export function createMouseHandlers(animateOnHover, startAnimation, stopAnimation, onMouseEnter, onMouseLeave) {
    return {
        onMouseEnter: (event) => {
            if (animateOnHover) {
                startAnimation();
            }
            onMouseEnter?.(event);
        },
        onMouseLeave: (event) => {
            if (animateOnHover) {
                stopAnimation();
            }
            onMouseLeave?.(event);
        }
    };
}
function resolveVariantTransition(transition) {
    return {
        duration: typeof transition?.duration === "number" ? transition.duration * 1000 : undefined,
        delay: typeof transition?.delay === "number" ? transition.delay * 1000 : undefined,
        easing: mapMotionEase(transition?.ease),
        offsets: Array.isArray(transition?.times)
            ? transition.times.filter((value) => typeof value === "number")
            : undefined
    };
}
function buildVariantKeyframes(element, normalState, targetState) {
    const pathLength = canMeasurePathLength(element) ? safeTotalLength(element) : null;
    const stateKeys = new Set();
    for (const key of Object.keys(normalState)) {
        if (key !== "transition") {
            stateKeys.add(key);
        }
    }
    for (const key of Object.keys(targetState)) {
        if (key !== "transition") {
            stateKeys.add(key);
        }
    }
    const keys = Array.from(stateKeys);
    const frameCount = Math.max(2, ...keys.map((key) => Math.max(getFrameCount(normalState[key]), getFrameCount(targetState[key]))));
    return Array.from({ length: frameCount }, (_, index) => buildVariantFrame(keys, index, frameCount, normalState, targetState, pathLength));
}
function buildVariantFrame(keys, index, frameCount, normalState, targetState, pathLength) {
    const frame = {};
    const transformParts = [];
    let currentPathLength;
    let currentPathOffset;
    for (const key of keys) {
        const resolved = resolveVariantValue(normalState[key], targetState[key], index, frameCount);
        if (resolved == null) {
            continue;
        }
        switch (key) {
            case "x":
            case "translateX":
                transformParts.push(`translateX(${resolved}px)`);
                break;
            case "y":
            case "translateY":
                transformParts.push(`translateY(${resolved}px)`);
                break;
            case "scale":
                transformParts.push(`scale(${resolved})`);
                break;
            case "scaleX":
                transformParts.push(`scaleX(${resolved})`);
                break;
            case "scaleY":
                transformParts.push(`scaleY(${resolved})`);
                break;
            case "rotate":
                transformParts.push(`rotate(${resolved}deg)`);
                break;
            case "pathLength":
                if (typeof resolved === "number") {
                    currentPathLength = resolved;
                }
                break;
            case "pathOffset":
                if (typeof resolved === "number") {
                    currentPathOffset = resolved;
                }
                break;
            default:
                frame[key] = resolved;
                break;
        }
    }
    if (transformParts.length > 0) {
        frame.transform = transformParts.join(" ");
    }
    else {
        frame.transform = "none";
    }
    if (pathLength != null && (currentPathLength != null || currentPathOffset != null)) {
        const lengthRatio = currentPathLength ?? 1;
        const offsetRatio = currentPathOffset ?? 0;
        frame.strokeDasharray = `${pathLength * lengthRatio} ${pathLength}`;
        frame.strokeDashoffset = `${pathLength * offsetRatio}`;
    }
    return frame;
}
function resolveVariantValue(normalValue, targetValue, index, frameCount) {
    if (Array.isArray(targetValue)) {
        return targetValue[index] ?? targetValue[targetValue.length - 1];
    }
    if (typeof targetValue === "number" || typeof targetValue === "string") {
        if (frameCount === 2 && (typeof normalValue === "number" || typeof normalValue === "string")) {
            return index === 0 ? normalValue : targetValue;
        }
        return targetValue;
    }
    if (Array.isArray(normalValue)) {
        return normalValue[index] ?? normalValue[normalValue.length - 1];
    }
    if (typeof normalValue === "number" || typeof normalValue === "string") {
        return normalValue;
    }
    return undefined;
}
function getFrameCount(value) {
    return Array.isArray(value) ? value.length : 0;
}
function canMeasurePathLength(element) {
    return typeof element.getTotalLength === "function";
}
function safeTotalLength(element) {
    try {
        return element.getTotalLength();
    }
    catch {
        return 0;
    }
}
function mapMotionEase(ease) {
    switch (ease) {
        case "easeIn":
            return "ease-in";
        case "easeOut":
            return "ease-out";
        case "easeInOut":
            return "ease-in-out";
        case "linear":
            return "linear";
        default:
            return "ease-in-out";
    }
}
//# sourceMappingURL=base.js.map
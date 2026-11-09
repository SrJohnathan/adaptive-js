import type { AnimatedLucideIconProps } from "../base.js";
export type SunIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SunIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SunIconProps): import("@adaptive-js/jsx").AdaptiveNode;

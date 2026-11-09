import { type AnimatedLucideIconProps } from "../base.js";
export type HeartIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function HeartIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: HeartIconProps): import("@adaptive-js/jsx").AdaptiveNode;

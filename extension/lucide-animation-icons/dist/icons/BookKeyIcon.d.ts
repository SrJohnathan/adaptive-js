import { type AnimatedLucideIconProps } from "../base.js";
export type BookKeyIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookKeyIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookKeyIconProps): import("@adaptive-js/jsx").AdaptiveNode;

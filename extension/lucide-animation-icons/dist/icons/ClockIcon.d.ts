import { type AnimatedLucideIconProps } from "../base.js";
export type ClockProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function Clock({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ClockProps): import("@adaptive-js/jsx").AdaptiveNode;

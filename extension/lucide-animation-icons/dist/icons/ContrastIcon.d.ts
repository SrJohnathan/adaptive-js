import { type AnimatedLucideIconProps } from "../base.js";
export type ContrastIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ContrastIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ContrastIconProps): import("@adaptive-js/jsx").AdaptiveNode;

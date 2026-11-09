import { type AnimatedLucideIconProps } from "../base.js";
export type PenOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PenOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PenOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

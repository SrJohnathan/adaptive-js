import { type AnimatedLucideIconProps } from "../base.js";
export type BoldIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BoldIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BoldIconProps): import("@adaptive-js/jsx").AdaptiveNode;

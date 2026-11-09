import { type AnimatedLucideIconProps } from "../base.js";
export type SlidersHorizontalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SlidersHorizontalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SlidersHorizontalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

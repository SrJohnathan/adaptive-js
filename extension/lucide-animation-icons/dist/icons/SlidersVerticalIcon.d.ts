import { type AnimatedLucideIconProps } from "../base.js";
export type SlidersVerticalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SlidersVerticalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SlidersVerticalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

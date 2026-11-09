import { type AnimatedLucideIconProps } from "../base.js";
export type BellIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BellIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BellIconProps): import("@adaptive-js/jsx").AdaptiveNode;

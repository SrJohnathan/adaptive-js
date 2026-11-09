import { type AnimatedLucideIconProps } from "../base.js";
export type SwordIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SwordIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SwordIconProps): import("@adaptive-js/jsx").AdaptiveNode;

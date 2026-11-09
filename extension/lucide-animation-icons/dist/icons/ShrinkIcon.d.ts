import { type AnimatedLucideIconProps } from "../base.js";
export type ShrinkIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ShrinkIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ShrinkIconProps): import("@adaptive-js/jsx").AdaptiveNode;

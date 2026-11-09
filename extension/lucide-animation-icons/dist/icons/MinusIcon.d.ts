import { type AnimatedLucideIconProps } from "../base.js";
export type MinusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MinusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MinusIconProps): import("@adaptive-js/jsx").AdaptiveNode;

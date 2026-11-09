import { type AnimatedLucideIconProps } from "../base.js";
export type HopOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function HopOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: HopOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

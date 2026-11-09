import { type AnimatedLucideIconProps } from "../base.js";
export type MouseOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MouseOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MouseOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

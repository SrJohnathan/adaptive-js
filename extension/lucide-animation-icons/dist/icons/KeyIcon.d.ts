import { type AnimatedLucideIconProps } from "../base.js";
export type KeyIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function KeyIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: KeyIconProps): import("@adaptive-js/jsx").AdaptiveNode;

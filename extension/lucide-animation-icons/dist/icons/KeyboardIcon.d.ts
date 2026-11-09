import { type AnimatedLucideIconProps } from "../base.js";
export type KeyboardIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function KeyboardIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: KeyboardIconProps): import("@adaptive-js/jsx").AdaptiveNode;

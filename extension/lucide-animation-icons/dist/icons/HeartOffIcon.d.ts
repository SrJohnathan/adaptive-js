import { type AnimatedLucideIconProps } from "../base.js";
export type HeartOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function HeartOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: HeartOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

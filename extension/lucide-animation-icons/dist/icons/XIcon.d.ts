import { type AnimatedLucideIconProps } from "../base.js";
export type XIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function XIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: XIconProps): import("@adaptive-js/jsx").AdaptiveNode;

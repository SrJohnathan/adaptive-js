import { type AnimatedLucideIconProps } from "../base.js";
export type FileMinusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileMinusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileMinusIconProps): import("@adaptive-js/jsx").AdaptiveNode;

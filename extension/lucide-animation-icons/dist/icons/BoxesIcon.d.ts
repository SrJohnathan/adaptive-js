import { type AnimatedLucideIconProps } from "../base.js";
export type BoxesIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BoxesIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BoxesIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type EyeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function EyeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: EyeIconProps): import("@adaptive-js/jsx").AdaptiveNode;

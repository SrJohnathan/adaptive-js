import { type AnimatedLucideIconProps } from "../base.js";
export type MinimizeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MinimizeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MinimizeIconProps): import("@adaptive-js/jsx").AdaptiveNode;

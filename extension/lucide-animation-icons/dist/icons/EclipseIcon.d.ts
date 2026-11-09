import { type AnimatedLucideIconProps } from "../base.js";
export type EclipseIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function EclipseIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: EclipseIconProps): import("@adaptive-js/jsx").AdaptiveNode;

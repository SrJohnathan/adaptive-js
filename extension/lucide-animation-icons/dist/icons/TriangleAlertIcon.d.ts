import { type AnimatedLucideIconProps } from "../base.js";
export type TriangleAlertIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TriangleAlertIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TriangleAlertIconProps): import("@adaptive-js/jsx").AdaptiveNode;

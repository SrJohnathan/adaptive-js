import { type AnimatedLucideIconProps } from "../base.js";
export type RouteIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RouteIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RouteIconProps): import("@adaptive-js/jsx").AdaptiveNode;

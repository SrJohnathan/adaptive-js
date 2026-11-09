import { type AnimatedLucideIconProps } from "../base.js";
export type LayoutDashboardIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function LayoutDashboardIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: LayoutDashboardIconProps): import("@adaptive-js/jsx").AdaptiveNode;

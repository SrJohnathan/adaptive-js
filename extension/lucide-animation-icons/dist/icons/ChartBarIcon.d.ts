import { type AnimatedLucideIconProps } from "../base.js";
export type ChartBarIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ChartBarIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ChartBarIconProps): import("@adaptive-js/jsx").AdaptiveNode;

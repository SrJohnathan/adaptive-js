import { type AnimatedLucideIconProps } from "../base.js";
export type ChartPieIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ChartPieIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ChartPieIconProps): import("@adaptive-js/jsx").AdaptiveNode;

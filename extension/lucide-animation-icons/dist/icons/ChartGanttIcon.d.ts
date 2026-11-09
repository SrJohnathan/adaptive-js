import { type AnimatedLucideIconProps } from "../base.js";
export type ChartGanttIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ChartGanttIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ChartGanttIconProps): import("@adaptive-js/jsx").AdaptiveNode;

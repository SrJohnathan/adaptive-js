import { type AnimatedLucideIconProps } from "../base.js";
export type SquareChartGanttIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquareChartGanttIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquareChartGanttIconProps): import("@adaptive-js/jsx").AdaptiveNode;

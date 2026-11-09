import { type AnimatedLucideIconProps } from "../base.js";
export type ChartScatterIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ChartScatterIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ChartScatterIconProps): import("@adaptive-js/jsx").AdaptiveNode;

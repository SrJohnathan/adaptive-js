import { type AnimatedLucideIconProps } from "../base.js";
export type ChartLineIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ChartLineIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ChartLineIconProps): import("@adaptive-js/jsx").AdaptiveNode;

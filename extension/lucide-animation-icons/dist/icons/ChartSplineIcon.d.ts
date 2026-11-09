import { type AnimatedLucideIconProps } from "../base.js";
export type ChartSplineIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ChartSplineIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ChartSplineIconProps): import("@adaptive-js/jsx").AdaptiveNode;

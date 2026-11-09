import { type AnimatedLucideIconProps } from "../base.js";
export type ChartColumnIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ChartColumnIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ChartColumnIconProps): import("@adaptive-js/jsx").AdaptiveNode;

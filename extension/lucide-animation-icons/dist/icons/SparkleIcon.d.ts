import { type AnimatedLucideIconProps } from "../base.js";
export type SparkleIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SparkleIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SparkleIconProps): import("@adaptive-js/jsx").AdaptiveNode;

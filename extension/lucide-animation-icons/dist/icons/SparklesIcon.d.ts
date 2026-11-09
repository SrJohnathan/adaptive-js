import { type AnimatedLucideIconProps } from "../base.js";
export type SparklesIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SparklesIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SparklesIconProps): import("@adaptive-js/jsx").AdaptiveNode;

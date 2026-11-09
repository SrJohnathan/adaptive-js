import { type AnimatedLucideIconProps } from "../base.js";
export type ChevronLeftIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ChevronLeftIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ChevronLeftIconProps): import("@adaptive-js/jsx").AdaptiveNode;

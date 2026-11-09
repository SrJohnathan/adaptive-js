import { type AnimatedLucideIconProps } from "../base.js";
export type BookTextIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookTextIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookTextIconProps): import("@adaptive-js/jsx").AdaptiveNode;

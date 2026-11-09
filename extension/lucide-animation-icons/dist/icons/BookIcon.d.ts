import { type AnimatedLucideIconProps } from "../base.js";
export type BookIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookIconProps): import("@adaptive-js/jsx").AdaptiveNode;

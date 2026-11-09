import { type AnimatedLucideIconProps } from "../base.js";
export type BookMarkedIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookMarkedIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookMarkedIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type BookHeartIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookHeartIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookHeartIconProps): import("@adaptive-js/jsx").AdaptiveNode;

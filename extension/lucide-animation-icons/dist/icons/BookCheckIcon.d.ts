import { type AnimatedLucideIconProps } from "../base.js";
export type BookCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

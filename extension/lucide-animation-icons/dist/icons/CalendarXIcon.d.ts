import { type AnimatedLucideIconProps } from "../base.js";
export type CalendarXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CalendarXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CalendarXIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type CalendarDaysIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CalendarDaysIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CalendarDaysIconProps): import("@adaptive-js/jsx").AdaptiveNode;

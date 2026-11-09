import { type AnimatedLucideIconProps } from "../base.js";
export type CalendarCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CalendarCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CalendarCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

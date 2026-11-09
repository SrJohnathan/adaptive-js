import { type AnimatedLucideIconProps } from "../base.js";
export type TimerIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TimerIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TimerIconProps): import("@adaptive-js/jsx").AdaptiveNode;

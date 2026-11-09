import { type AnimatedLucideIconProps } from "../base.js";
export type AlarmClockIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function AlarmClockIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: AlarmClockIconProps): import("@adaptive-js/jsx").AdaptiveNode;

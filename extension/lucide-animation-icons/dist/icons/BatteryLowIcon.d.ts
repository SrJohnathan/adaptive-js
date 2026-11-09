import { type AnimatedLucideIconProps } from "../base.js";
export type BatteryLowIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BatteryLowIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BatteryLowIconProps): import("@adaptive-js/jsx").AdaptiveNode;

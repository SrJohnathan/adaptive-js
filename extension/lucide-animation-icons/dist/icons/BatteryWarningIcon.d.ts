import { type AnimatedLucideIconProps } from "../base.js";
export type BatteryWarningIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BatteryWarningIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BatteryWarningIconProps): import("@adaptive-js/jsx").AdaptiveNode;

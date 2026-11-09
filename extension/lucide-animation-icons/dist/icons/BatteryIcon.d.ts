import { type AnimatedLucideIconProps } from "../base.js";
export type BatteryIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BatteryIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BatteryIconProps): import("@adaptive-js/jsx").AdaptiveNode;

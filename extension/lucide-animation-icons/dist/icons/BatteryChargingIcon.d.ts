import { type AnimatedLucideIconProps } from "../base.js";
export type BatteryChargingIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BatteryChargingIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BatteryChargingIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type BatteryMediumIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BatteryMediumIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BatteryMediumIconProps): import("@adaptive-js/jsx").AdaptiveNode;

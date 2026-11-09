import { type AnimatedLucideIconProps } from "../base.js";
export type BatteryFullIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BatteryFullIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BatteryFullIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type SnowflakeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SnowflakeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SnowflakeIconProps): import("@adaptive-js/jsx").AdaptiveNode;

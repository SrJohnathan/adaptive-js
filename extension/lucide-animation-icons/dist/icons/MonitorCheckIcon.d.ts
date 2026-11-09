import { type AnimatedLucideIconProps } from "../base.js";
export type MonitorCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MonitorCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MonitorCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

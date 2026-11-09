import { type AnimatedLucideIconProps } from "../base.js";
export type GaugeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function GaugeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: GaugeIconProps): import("@adaptive-js/jsx").AdaptiveNode;

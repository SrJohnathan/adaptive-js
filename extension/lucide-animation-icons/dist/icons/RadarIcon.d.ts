import { type AnimatedLucideIconProps } from "../base.js";
export type RadarIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RadarIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RadarIconProps): import("@adaptive-js/jsx").AdaptiveNode;

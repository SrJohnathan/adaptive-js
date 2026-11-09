import { type AnimatedLucideIconProps } from "../base.js";
export type AirplayIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function AirplayIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: AirplayIconProps): import("@adaptive-js/jsx").AdaptiveNode;

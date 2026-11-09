import { type AnimatedLucideIconProps } from "../base.js";
export type LandmarkIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function LandmarkIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: LandmarkIconProps): import("@adaptive-js/jsx").AdaptiveNode;

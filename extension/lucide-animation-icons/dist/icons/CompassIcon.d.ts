import { type AnimatedLucideIconProps } from "../base.js";
export type CompassIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CompassIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CompassIconProps): import("@adaptive-js/jsx").AdaptiveNode;

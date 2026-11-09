import { type AnimatedLucideIconProps } from "../base.js";
export type CircleCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CircleCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CircleCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

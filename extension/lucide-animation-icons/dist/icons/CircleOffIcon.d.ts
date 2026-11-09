import { type AnimatedLucideIconProps } from "../base.js";
export type CircleOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CircleOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CircleOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type CircleCheckBigIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CircleCheckBigIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CircleCheckBigIconProps): import("@adaptive-js/jsx").AdaptiveNode;

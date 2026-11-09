import { type AnimatedLucideIconProps } from "../base.js";
export type RocketIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RocketIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RocketIconProps): import("@adaptive-js/jsx").AdaptiveNode;

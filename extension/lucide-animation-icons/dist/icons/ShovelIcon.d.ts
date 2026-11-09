import { type AnimatedLucideIconProps } from "../base.js";
export type ShovelIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ShovelIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ShovelIconProps): import("@adaptive-js/jsx").AdaptiveNode;

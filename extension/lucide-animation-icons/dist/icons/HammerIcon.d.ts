import { type AnimatedLucideIconProps } from "../base.js";
export type HammerIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function HammerIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: HammerIconProps): import("@adaptive-js/jsx").AdaptiveNode;

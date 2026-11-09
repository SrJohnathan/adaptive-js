import { type AnimatedLucideIconProps } from "../base.js";
export type BoltIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BoltIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BoltIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type GripHorizontalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function GripHorizontalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: GripHorizontalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

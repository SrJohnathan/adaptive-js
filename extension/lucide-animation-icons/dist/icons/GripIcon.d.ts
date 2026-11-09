import { type AnimatedLucideIconProps } from "../base.js";
export type GripIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function GripIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: GripIconProps): import("@adaptive-js/jsx").AdaptiveNode;

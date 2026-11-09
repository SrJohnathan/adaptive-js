import { type AnimatedLucideIconProps } from "../base.js";
export type BrushIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BrushIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BrushIconProps): import("@adaptive-js/jsx").AdaptiveNode;

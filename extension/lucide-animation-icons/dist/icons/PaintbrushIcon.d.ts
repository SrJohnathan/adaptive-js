import { type AnimatedLucideIconProps } from "../base.js";
export type PaintbrushIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PaintbrushIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PaintbrushIconProps): import("@adaptive-js/jsx").AdaptiveNode;

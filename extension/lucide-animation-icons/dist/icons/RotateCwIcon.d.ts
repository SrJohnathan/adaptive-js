import { type AnimatedLucideIconProps } from "../base.js";
export type RotateCwIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RotateCwIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RotateCwIconProps): import("@adaptive-js/jsx").AdaptiveNode;

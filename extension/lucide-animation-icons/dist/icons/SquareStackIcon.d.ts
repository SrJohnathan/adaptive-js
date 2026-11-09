import { type AnimatedLucideIconProps } from "../base.js";
export type SquareStackIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquareStackIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquareStackIconProps): import("@adaptive-js/jsx").AdaptiveNode;

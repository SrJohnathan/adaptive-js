import { type AnimatedLucideIconProps } from "../base.js";
export type SquareScissorsIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquareScissorsIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquareScissorsIconProps): import("@adaptive-js/jsx").AdaptiveNode;

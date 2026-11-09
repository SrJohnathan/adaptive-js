import { type AnimatedLucideIconProps } from "../base.js";
export type SquareCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquareCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquareCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

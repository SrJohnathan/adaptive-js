import { type AnimatedLucideIconProps } from "../base.js";
export type SquareCheckBigIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquareCheckBigIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquareCheckBigIconProps): import("@adaptive-js/jsx").AdaptiveNode;

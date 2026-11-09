import { type AnimatedLucideIconProps } from "../base.js";
export type SquareXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquareXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquareXIconProps): import("@adaptive-js/jsx").AdaptiveNode;

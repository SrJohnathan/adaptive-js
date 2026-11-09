import { type AnimatedLucideIconProps } from "../base.js";
export type KeySquareIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function KeySquareIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: KeySquareIconProps): import("@adaptive-js/jsx").AdaptiveNode;

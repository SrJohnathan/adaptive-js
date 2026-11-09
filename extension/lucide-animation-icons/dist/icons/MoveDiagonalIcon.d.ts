import { type AnimatedLucideIconProps } from "../base.js";
export type MoveDiagonalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MoveDiagonalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MoveDiagonalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

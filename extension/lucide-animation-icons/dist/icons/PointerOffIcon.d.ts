import { type AnimatedLucideIconProps } from "../base.js";
export type PointerOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PointerOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PointerOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

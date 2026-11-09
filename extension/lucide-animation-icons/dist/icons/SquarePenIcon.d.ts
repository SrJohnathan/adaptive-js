import { type AnimatedLucideIconProps } from "../base.js";
export type SquarePenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquarePenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquarePenIconProps): import("@adaptive-js/jsx").AdaptiveNode;

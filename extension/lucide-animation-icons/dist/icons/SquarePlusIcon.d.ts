import { type AnimatedLucideIconProps } from "../base.js";
export type SquarePlusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SquarePlusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SquarePlusIconProps): import("@adaptive-js/jsx").AdaptiveNode;

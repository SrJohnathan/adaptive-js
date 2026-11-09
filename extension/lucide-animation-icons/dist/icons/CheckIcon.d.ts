import { type AnimatedLucideIconProps } from "../base.js";
export type CheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

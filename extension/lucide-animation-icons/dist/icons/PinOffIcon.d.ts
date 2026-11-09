import { type AnimatedLucideIconProps } from "../base.js";
export type PinOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PinOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PinOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

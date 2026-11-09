import { type AnimatedLucideIconProps } from "../base.js";
export type BellOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BellOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BellOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type BinaryIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BinaryIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BinaryIconProps): import("@adaptive-js/jsx").AdaptiveNode;

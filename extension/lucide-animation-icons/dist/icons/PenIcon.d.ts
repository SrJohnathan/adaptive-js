import { type AnimatedLucideIconProps } from "../base.js";
export type PenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PenIconProps): import("@adaptive-js/jsx").AdaptiveNode;

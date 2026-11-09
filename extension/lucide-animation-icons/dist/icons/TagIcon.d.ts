import { type AnimatedLucideIconProps } from "../base.js";
export type TagIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TagIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TagIconProps): import("@adaptive-js/jsx").AdaptiveNode;

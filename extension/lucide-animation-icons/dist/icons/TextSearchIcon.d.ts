import { type AnimatedLucideIconProps } from "../base.js";
export type TextSearchIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TextSearchIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TextSearchIconProps): import("@adaptive-js/jsx").AdaptiveNode;

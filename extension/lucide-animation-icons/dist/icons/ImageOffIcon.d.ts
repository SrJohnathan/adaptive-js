import { type AnimatedLucideIconProps } from "../base.js";
export type ImageOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ImageOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ImageOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

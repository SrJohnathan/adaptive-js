import { type AnimatedLucideIconProps } from "../base.js";
export type ImageDownIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ImageDownIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ImageDownIconProps): import("@adaptive-js/jsx").AdaptiveNode;

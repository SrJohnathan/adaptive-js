import { type AnimatedLucideIconProps } from "../base.js";
export type ImagesIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ImagesIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ImagesIconProps): import("@adaptive-js/jsx").AdaptiveNode;

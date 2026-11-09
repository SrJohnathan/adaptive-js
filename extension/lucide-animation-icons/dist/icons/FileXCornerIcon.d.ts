import { type AnimatedLucideIconProps } from "../base.js";
export type FileXCornerIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileXCornerIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileXCornerIconProps): import("@adaptive-js/jsx").AdaptiveNode;

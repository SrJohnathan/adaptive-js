import { type AnimatedLucideIconProps } from "../base.js";
export type FileCheckCornerIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileCheckCornerIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileCheckCornerIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type FileSlidersIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileSlidersIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileSlidersIconProps): import("@adaptive-js/jsx").AdaptiveNode;

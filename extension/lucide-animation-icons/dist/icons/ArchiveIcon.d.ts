import { type AnimatedLucideIconProps } from "../base.js";
export type ArchiveIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ArchiveIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ArchiveIconProps): import("@adaptive-js/jsx").AdaptiveNode;

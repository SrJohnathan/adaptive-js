import { type AnimatedLucideIconProps } from "../base.js";
export type GalleryHorizontalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function GalleryHorizontalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: GalleryHorizontalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

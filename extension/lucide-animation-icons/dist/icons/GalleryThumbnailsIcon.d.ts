import { type AnimatedLucideIconProps } from "../base.js";
export type GalleryThumbnailsIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function GalleryThumbnailsIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: GalleryThumbnailsIconProps): import("@adaptive-js/jsx").AdaptiveNode;

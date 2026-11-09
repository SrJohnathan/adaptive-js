import { type AnimatedLucideIconProps } from "../base.js";
export type GalleryVerticalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function GalleryVerticalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: GalleryVerticalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

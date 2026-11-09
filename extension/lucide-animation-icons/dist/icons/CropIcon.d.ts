import { type AnimatedLucideIconProps } from "../base.js";
export type CropIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CropIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CropIconProps): import("@adaptive-js/jsx").AdaptiveNode;

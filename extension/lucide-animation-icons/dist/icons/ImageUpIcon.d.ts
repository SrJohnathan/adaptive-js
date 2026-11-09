import { type AnimatedLucideIconProps } from "../base.js";
export type ImageUpIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ImageUpIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ImageUpIconProps): import("@adaptive-js/jsx").AdaptiveNode;

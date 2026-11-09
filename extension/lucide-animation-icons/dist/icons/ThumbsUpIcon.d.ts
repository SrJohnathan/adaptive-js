import { type AnimatedLucideIconProps } from "../base.js";
export type ThumbsUpIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ThumbsUpIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ThumbsUpIconProps): import("@adaptive-js/jsx").AdaptiveNode;

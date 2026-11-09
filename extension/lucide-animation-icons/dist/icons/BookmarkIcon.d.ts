import { type AnimatedLucideIconProps } from "../base.js";
export type BookmarkIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookmarkIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookmarkIconProps): import("@adaptive-js/jsx").AdaptiveNode;

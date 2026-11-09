import { type AnimatedLucideIconProps } from "../base.js";
export type BookmarkCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookmarkCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookmarkCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

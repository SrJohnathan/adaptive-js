import { type AnimatedLucideIconProps } from "../base.js";
export type RssIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RssIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RssIconProps): import("@adaptive-js/jsx").AdaptiveNode;

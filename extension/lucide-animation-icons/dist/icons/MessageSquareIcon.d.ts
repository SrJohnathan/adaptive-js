import { type AnimatedLucideIconProps } from "../base.js";
export type MessageSquareIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageSquareIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageSquareIconProps): import("@adaptive-js/jsx").AdaptiveNode;

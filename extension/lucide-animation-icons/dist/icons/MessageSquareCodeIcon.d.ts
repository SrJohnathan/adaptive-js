import { type AnimatedLucideIconProps } from "../base.js";
export type MessageSquareCodeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageSquareCodeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageSquareCodeIconProps): import("@adaptive-js/jsx").AdaptiveNode;

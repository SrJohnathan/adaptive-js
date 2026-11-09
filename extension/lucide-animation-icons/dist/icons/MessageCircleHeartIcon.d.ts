import { type AnimatedLucideIconProps } from "../base.js";
export type MessageCircleHeartIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageCircleHeartIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageCircleHeartIconProps): import("@adaptive-js/jsx").AdaptiveNode;

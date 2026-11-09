import { type AnimatedLucideIconProps } from "../base.js";
export type MessageSquareHeartIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageSquareHeartIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageSquareHeartIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type MessageCircleIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageCircleIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageCircleIconProps): import("@adaptive-js/jsx").AdaptiveNode;

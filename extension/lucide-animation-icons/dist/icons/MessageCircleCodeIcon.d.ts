import { type AnimatedLucideIconProps } from "../base.js";
export type MessageCircleCodeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageCircleCodeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageCircleCodeIconProps): import("@adaptive-js/jsx").AdaptiveNode;

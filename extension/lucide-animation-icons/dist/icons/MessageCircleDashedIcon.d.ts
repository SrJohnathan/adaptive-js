import { type AnimatedLucideIconProps } from "../base.js";
export type MessageCircleDashedIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageCircleDashedIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageCircleDashedIconProps): import("@adaptive-js/jsx").AdaptiveNode;

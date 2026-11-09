import { type AnimatedLucideIconProps } from "../base.js";
export type MessageCircleWarningIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageCircleWarningIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageCircleWarningIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type MessageSquareWarningIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageSquareWarningIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageSquareWarningIconProps): import("@adaptive-js/jsx").AdaptiveNode;

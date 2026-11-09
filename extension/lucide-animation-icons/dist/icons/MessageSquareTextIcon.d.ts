import { type AnimatedLucideIconProps } from "../base.js";
export type MessageSquareTextIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageSquareTextIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageSquareTextIconProps): import("@adaptive-js/jsx").AdaptiveNode;

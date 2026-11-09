import { type AnimatedLucideIconProps } from "../base.js";
export type MessageSquareDashedIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageSquareDashedIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageSquareDashedIconProps): import("@adaptive-js/jsx").AdaptiveNode;

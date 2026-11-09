import { type AnimatedLucideIconProps } from "../base.js";
export type MessageSquareDotIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageSquareDotIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageSquareDotIconProps): import("@adaptive-js/jsx").AdaptiveNode;

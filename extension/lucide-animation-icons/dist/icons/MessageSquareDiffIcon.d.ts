import { type AnimatedLucideIconProps } from "../base.js";
export type MessageSquareDiffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MessageSquareDiffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MessageSquareDiffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

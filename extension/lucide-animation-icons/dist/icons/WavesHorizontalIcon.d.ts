import { type AnimatedLucideIconProps } from "../base.js";
export type WavesHorizontalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function WavesHorizontalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: WavesHorizontalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

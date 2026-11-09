import { type AnimatedLucideIconProps } from "../base.js";
export type SpeechIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function SpeechIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: SpeechIconProps): import("@adaptive-js/jsx").AdaptiveNode;

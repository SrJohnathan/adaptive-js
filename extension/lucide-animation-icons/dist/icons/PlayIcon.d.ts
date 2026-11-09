import { type AnimatedLucideIconProps } from "../base.js";
export type PlayIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PlayIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PlayIconProps): import("@adaptive-js/jsx").AdaptiveNode;

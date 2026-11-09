import { type AnimatedLucideIconProps } from "../base.js";
export type HandHeartIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function HandHeartIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: HandHeartIconProps): import("@adaptive-js/jsx").AdaptiveNode;

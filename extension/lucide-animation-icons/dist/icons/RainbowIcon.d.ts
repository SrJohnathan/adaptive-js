import { type AnimatedLucideIconProps } from "../base.js";
export type RainbowIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RainbowIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RainbowIconProps): import("@adaptive-js/jsx").AdaptiveNode;

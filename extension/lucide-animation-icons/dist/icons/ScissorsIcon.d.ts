import { type AnimatedLucideIconProps } from "../base.js";
export type ScissorsIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ScissorsIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ScissorsIconProps): import("@adaptive-js/jsx").AdaptiveNode;

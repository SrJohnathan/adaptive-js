import { type AnimatedLucideIconProps } from "../base.js";
export type WifiIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function WifiIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: WifiIconProps): import("@adaptive-js/jsx").AdaptiveNode;

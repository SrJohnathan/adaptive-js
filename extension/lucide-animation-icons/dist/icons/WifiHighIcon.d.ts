import { type AnimatedLucideIconProps } from "../base.js";
export type WifiHighIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function WifiHighIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: WifiHighIconProps): import("@adaptive-js/jsx").AdaptiveNode;

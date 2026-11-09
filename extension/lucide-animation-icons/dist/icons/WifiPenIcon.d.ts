import { type AnimatedLucideIconProps } from "../base.js";
export type WifiPenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function WifiPenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: WifiPenIconProps): import("@adaptive-js/jsx").AdaptiveNode;

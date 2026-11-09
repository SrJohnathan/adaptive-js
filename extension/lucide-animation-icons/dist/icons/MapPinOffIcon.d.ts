import { type AnimatedLucideIconProps } from "../base.js";
export type MapPinOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MapPinOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MapPinOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

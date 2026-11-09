import { type AnimatedLucideIconProps } from "../base.js";
export type MapPinCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MapPinCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MapPinCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type MapPinXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MapPinXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MapPinXIconProps): import("@adaptive-js/jsx").AdaptiveNode;

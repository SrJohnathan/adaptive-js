import { type AnimatedLucideIconProps } from "../base.js";
export type HouseIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function HouseIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: HouseIconProps): import("@adaptive-js/jsx").AdaptiveNode;

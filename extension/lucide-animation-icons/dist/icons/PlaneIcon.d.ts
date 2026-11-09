import { type AnimatedLucideIconProps } from "../base.js";
export type PlaneIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PlaneIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PlaneIconProps): import("@adaptive-js/jsx").AdaptiveNode;

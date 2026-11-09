import { type AnimatedLucideIconProps } from "../base.js";
export type CircleXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CircleXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CircleXIconProps): import("@adaptive-js/jsx").AdaptiveNode;

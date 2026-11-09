import { type AnimatedLucideIconProps } from "../base.js";
export type FileStackIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileStackIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileStackIconProps): import("@adaptive-js/jsx").AdaptiveNode;

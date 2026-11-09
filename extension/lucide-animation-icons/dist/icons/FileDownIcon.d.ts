import { type AnimatedLucideIconProps } from "../base.js";
export type FileDownIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileDownIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileDownIconProps): import("@adaptive-js/jsx").AdaptiveNode;

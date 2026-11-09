import { type AnimatedLucideIconProps } from "../base.js";
export type FileCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type FileUpIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileUpIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileUpIconProps): import("@adaptive-js/jsx").AdaptiveNode;

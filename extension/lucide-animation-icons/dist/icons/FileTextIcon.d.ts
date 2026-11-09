import { type AnimatedLucideIconProps } from "../base.js";
export type FileTextIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FileTextIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FileTextIconProps): import("@adaptive-js/jsx").AdaptiveNode;

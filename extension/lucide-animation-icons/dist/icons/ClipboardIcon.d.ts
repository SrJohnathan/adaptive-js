import { type AnimatedLucideIconProps } from "../base.js";
export type ClipboardIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ClipboardIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ClipboardIconProps): import("@adaptive-js/jsx").AdaptiveNode;

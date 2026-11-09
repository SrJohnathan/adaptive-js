import { type AnimatedLucideIconProps } from "../base.js";
export type ClipboardListIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ClipboardListIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ClipboardListIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type ClipboardPenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ClipboardPenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ClipboardPenIconProps): import("@adaptive-js/jsx").AdaptiveNode;

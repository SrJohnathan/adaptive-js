import { type AnimatedLucideIconProps } from "../base.js";
export type TextCursorIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TextCursorIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TextCursorIconProps): import("@adaptive-js/jsx").AdaptiveNode;

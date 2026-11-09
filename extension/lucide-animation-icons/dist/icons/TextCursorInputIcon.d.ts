import { type AnimatedLucideIconProps } from "../base.js";
export type TextCursorInputIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TextCursorInputIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TextCursorInputIconProps): import("@adaptive-js/jsx").AdaptiveNode;

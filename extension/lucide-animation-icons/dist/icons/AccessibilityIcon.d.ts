import { type AnimatedLucideIconProps } from "../base.js";
export type AccessibilityIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function AccessibilityIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: AccessibilityIconProps): import("@adaptive-js/jsx").AdaptiveNode;

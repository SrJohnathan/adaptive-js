import { type AnimatedLucideIconProps } from "../base.js";
export type VibrateIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function VibrateIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: VibrateIconProps): import("@adaptive-js/jsx").AdaptiveNode;

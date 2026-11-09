import { type AnimatedLucideIconProps } from "../base.js";
export type ToggleLeftIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ToggleLeftIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ToggleLeftIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type PanelLeftCloseIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelLeftCloseIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelLeftCloseIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type PanelTopCloseIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelTopCloseIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelTopCloseIconProps): import("@adaptive-js/jsx").AdaptiveNode;

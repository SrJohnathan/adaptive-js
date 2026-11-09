import { type AnimatedLucideIconProps } from "../base.js";
export type PanelBottomCloseIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelBottomCloseIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelBottomCloseIconProps): import("@adaptive-js/jsx").AdaptiveNode;

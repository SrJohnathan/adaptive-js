import { type AnimatedLucideIconProps } from "../base.js";
export type PanelRightCloseIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelRightCloseIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelRightCloseIconProps): import("@adaptive-js/jsx").AdaptiveNode;

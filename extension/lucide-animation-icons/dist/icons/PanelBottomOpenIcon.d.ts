import { type AnimatedLucideIconProps } from "../base.js";
export type PanelBottomOpenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelBottomOpenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelBottomOpenIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type LayoutPanelLeftIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function LayoutPanelLeftIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: LayoutPanelLeftIconProps): import("@adaptive-js/jsx").AdaptiveNode;

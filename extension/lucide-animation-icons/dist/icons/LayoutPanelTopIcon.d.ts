import { type AnimatedLucideIconProps } from "../base.js";
export type LayoutPanelTopIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function LayoutPanelTopIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: LayoutPanelTopIconProps): import("@adaptive-js/jsx").AdaptiveNode;

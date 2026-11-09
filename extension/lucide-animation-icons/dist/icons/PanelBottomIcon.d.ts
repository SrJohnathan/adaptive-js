import { type AnimatedLucideIconProps } from "../base.js";
export type PanelBottomIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelBottomIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelBottomIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type PanelTopIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelTopIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelTopIconProps): import("@adaptive-js/jsx").AdaptiveNode;

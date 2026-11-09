import { type AnimatedLucideIconProps } from "../base.js";
export type PanelTopOpenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelTopOpenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelTopOpenIconProps): import("@adaptive-js/jsx").AdaptiveNode;

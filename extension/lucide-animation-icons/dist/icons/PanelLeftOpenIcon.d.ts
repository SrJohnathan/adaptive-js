import { type AnimatedLucideIconProps } from "../base.js";
export type PanelLeftOpenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelLeftOpenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelLeftOpenIconProps): import("@adaptive-js/jsx").AdaptiveNode;

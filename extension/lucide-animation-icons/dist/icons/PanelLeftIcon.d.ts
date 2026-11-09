import { type AnimatedLucideIconProps } from "../base.js";
export type PanelLeftIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelLeftIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelLeftIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type PanelRightOpenIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelRightOpenIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelRightOpenIconProps): import("@adaptive-js/jsx").AdaptiveNode;

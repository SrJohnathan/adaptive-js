import { type AnimatedLucideIconProps } from "../base.js";
export type PanelRightIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PanelRightIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PanelRightIconProps): import("@adaptive-js/jsx").AdaptiveNode;

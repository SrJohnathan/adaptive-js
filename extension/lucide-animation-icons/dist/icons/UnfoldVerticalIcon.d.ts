import { type AnimatedLucideIconProps } from "../base.js";
export type UnfoldVerticalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UnfoldVerticalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UnfoldVerticalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type UnfoldHorizontalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function UnfoldHorizontalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: UnfoldHorizontalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

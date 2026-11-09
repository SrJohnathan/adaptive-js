import { type AnimatedLucideIconProps } from "../base.js";
export type ExpandIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ExpandIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ExpandIconProps): import("@adaptive-js/jsx").AdaptiveNode;

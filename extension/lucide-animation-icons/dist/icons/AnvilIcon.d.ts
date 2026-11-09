import { type AnimatedLucideIconProps } from "../base.js";
export type AnvilIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function AnvilIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: AnvilIconProps): import("@adaptive-js/jsx").AdaptiveNode;

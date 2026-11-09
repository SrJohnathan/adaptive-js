import { type AnimatedLucideIconProps } from "../base.js";
export type BlendIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BlendIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BlendIconProps): import("@adaptive-js/jsx").AdaptiveNode;

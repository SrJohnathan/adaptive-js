import { type AnimatedLucideIconProps } from "../base.js";
export type CastIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CastIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CastIconProps): import("@adaptive-js/jsx").AdaptiveNode;

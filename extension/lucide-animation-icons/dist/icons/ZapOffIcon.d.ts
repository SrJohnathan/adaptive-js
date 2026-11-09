import { type AnimatedLucideIconProps } from "../base.js";
export type ZapOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ZapOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ZapOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

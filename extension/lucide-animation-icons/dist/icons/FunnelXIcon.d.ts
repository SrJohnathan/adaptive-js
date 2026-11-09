import { type AnimatedLucideIconProps } from "../base.js";
export type FunnelXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function FunnelXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: FunnelXIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type GavelIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function GavelIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: GavelIconProps): import("@adaptive-js/jsx").AdaptiveNode;

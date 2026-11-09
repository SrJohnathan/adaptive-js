import { type AnimatedLucideIconProps } from "../base.js";
export type CpuIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CpuIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CpuIconProps): import("@adaptive-js/jsx").AdaptiveNode;

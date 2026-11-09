import { type AnimatedLucideIconProps } from "../base.js";
export type AxeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function AxeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: AxeIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type ChevronsUpDownIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ChevronsUpDownIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ChevronsUpDownIconProps): import("@adaptive-js/jsx").AdaptiveNode;

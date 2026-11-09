import { type AnimatedLucideIconProps } from "../base.js";
export type ListCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ListCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ListCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

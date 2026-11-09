import { type AnimatedLucideIconProps } from "../base.js";
export type ListChecksIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ListChecksIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ListChecksIconProps): import("@adaptive-js/jsx").AdaptiveNode;

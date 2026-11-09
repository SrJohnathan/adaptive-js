import { type AnimatedLucideIconProps } from "../base.js";
export type MoreVerticalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function MoreVerticalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: MoreVerticalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

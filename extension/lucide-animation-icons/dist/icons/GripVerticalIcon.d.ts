import { type AnimatedLucideIconProps } from "../base.js";
export type GripVerticalIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function GripVerticalIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: GripVerticalIconProps): import("@adaptive-js/jsx").AdaptiveNode;

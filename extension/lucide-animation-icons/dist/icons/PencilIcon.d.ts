import { type AnimatedLucideIconProps } from "../base.js";
export type PencilIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PencilIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PencilIconProps): import("@adaptive-js/jsx").AdaptiveNode;

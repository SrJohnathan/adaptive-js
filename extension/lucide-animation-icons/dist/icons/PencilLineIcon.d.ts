import { type AnimatedLucideIconProps } from "../base.js";
export type PencilLineIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PencilLineIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PencilLineIconProps): import("@adaptive-js/jsx").AdaptiveNode;

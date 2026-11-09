import { type AnimatedLucideIconProps } from "../base.js";
export type PenLineIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function PenLineIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: PenLineIconProps): import("@adaptive-js/jsx").AdaptiveNode;

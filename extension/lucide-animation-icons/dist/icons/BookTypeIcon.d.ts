import { type AnimatedLucideIconProps } from "../base.js";
export type BookTypeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookTypeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookTypeIconProps): import("@adaptive-js/jsx").AdaptiveNode;

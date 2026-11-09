import { type AnimatedLucideIconProps } from "../base.js";
export type BookImageIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookImageIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookImageIconProps): import("@adaptive-js/jsx").AdaptiveNode;

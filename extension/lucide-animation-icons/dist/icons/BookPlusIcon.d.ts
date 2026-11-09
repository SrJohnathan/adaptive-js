import { type AnimatedLucideIconProps } from "../base.js";
export type BookPlusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BookPlusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BookPlusIconProps): import("@adaptive-js/jsx").AdaptiveNode;

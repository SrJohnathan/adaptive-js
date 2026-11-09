import { type AnimatedLucideIconProps } from "../base.js";
export type StarIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function StarIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: StarIconProps): import("@adaptive-js/jsx").AdaptiveNode;

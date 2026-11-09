import { type AnimatedLucideIconProps } from "../base.js";
export type StarOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function StarOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: StarOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type BeanOffIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BeanOffIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BeanOffIconProps): import("@adaptive-js/jsx").AdaptiveNode;

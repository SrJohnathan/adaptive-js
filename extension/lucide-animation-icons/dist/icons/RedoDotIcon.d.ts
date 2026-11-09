import { type AnimatedLucideIconProps } from "../base.js";
export type RedoDotIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RedoDotIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RedoDotIconProps): import("@adaptive-js/jsx").AdaptiveNode;

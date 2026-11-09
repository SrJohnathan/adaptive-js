import { type AnimatedLucideIconProps } from "../base.js";
export type RedoIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RedoIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RedoIconProps): import("@adaptive-js/jsx").AdaptiveNode;

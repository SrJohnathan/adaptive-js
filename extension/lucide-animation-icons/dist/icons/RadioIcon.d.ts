import { type AnimatedLucideIconProps } from "../base.js";
export type RadioIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function RadioIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: RadioIconProps): import("@adaptive-js/jsx").AdaptiveNode;

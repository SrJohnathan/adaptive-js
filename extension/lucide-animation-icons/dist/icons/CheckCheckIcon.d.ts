import { type AnimatedLucideIconProps } from "../base.js";
export type CheckCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CheckCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CheckCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

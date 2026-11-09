import { type AnimatedLucideIconProps } from "../base.js";
export type BellRingIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BellRingIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BellRingIconProps): import("@adaptive-js/jsx").AdaptiveNode;

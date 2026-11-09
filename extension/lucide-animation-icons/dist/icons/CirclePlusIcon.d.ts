import { type AnimatedLucideIconProps } from "../base.js";
export type CirclePlusIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CirclePlusIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CirclePlusIconProps): import("@adaptive-js/jsx").AdaptiveNode;

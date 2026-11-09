import { type AnimatedLucideIconProps } from "../base.js";
export type CircleAlertIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function CircleAlertIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: CircleAlertIconProps): import("@adaptive-js/jsx").AdaptiveNode;

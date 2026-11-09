import { type AnimatedLucideIconProps } from "../base.js";
export type OctagonAlertIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function OctagonAlertIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: OctagonAlertIconProps): import("@adaptive-js/jsx").AdaptiveNode;

import { type AnimatedLucideIconProps } from "../base.js";
export type BadgeAlertIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BadgeAlertIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BadgeAlertIconProps): import("@adaptive-js/jsx").AdaptiveNode;

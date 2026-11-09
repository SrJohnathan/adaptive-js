import { type AnimatedLucideIconProps } from "../base.js";
export type ShieldAlertIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function ShieldAlertIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: ShieldAlertIconProps): import("@adaptive-js/jsx").AdaptiveNode;

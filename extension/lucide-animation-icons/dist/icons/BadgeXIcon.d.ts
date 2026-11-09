import { type AnimatedLucideIconProps } from "../base.js";
export type BadgeXIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BadgeXIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BadgeXIconProps): import("@adaptive-js/jsx").AdaptiveNode;

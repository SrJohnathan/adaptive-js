import { type AnimatedLucideIconProps } from "../base.js";
export type BadgeCheckIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function BadgeCheckIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: BadgeCheckIconProps): import("@adaptive-js/jsx").AdaptiveNode;

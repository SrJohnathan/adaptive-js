import { type AnimatedLucideIconProps } from "../base.js";
export type TelescopeIconProps = AnimatedLucideIconProps & {
    color?: string;
    strokeWidth?: number;
};
export declare function TelescopeIcon({ color, size, strokeWidth, className, onMouseEnter, onMouseLeave, duration, animateOnHover, iconRef, ...props }: TelescopeIconProps): import("@adaptive-js/jsx").AdaptiveNode;
